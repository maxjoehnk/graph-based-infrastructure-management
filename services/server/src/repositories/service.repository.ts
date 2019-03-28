import { Injectable } from '../ioc-container';
import { Dgraph } from '../data-access/dgraph';
import { Mutation, Response, Txn } from 'dgraph-js';
import { ServiceModel } from '../../../agent/src/contracts/viewmodels/service-model';

interface DgraphReference {
    uid: string;
}

interface DgraphEntity {
    uid?: string;
    xid: string;
    name: string;
    status: number;
    type: string;
    dependencies: DgraphReference[];
}

export interface ServiceEntity {
    uid: string;
    xid: string;
    name: string;
    status: number;
    type: string;
    dependencies?: ServiceEntity[];
    '~dependencies'?: ServiceEntity[];
}

@Injectable()
export class ServiceRepository {
    constructor(private dgraph: Dgraph) {
    }

    async list(): Promise<ServiceEntity[]> {
        const res = await this.dgraph.query<{ entities: ServiceEntity[] }>(`{
          entities(func: uid(0x1)) {
            uid
            expand(_all_) {
              uid
              name
              status
              type
              ~dependencies {
                uid
                name
                status
                type
              }
            }
          }
        }`);

        return res.entities;
    }

    async upsert(data: ServiceModel[]) {
        await this.dgraph.transaction(async txn => {
            const findById = ServiceRepository.findById(txn);
            for (const entry of data) {
                const res = await findById(entry.id);
                const resData = res.getJson();

                const dependencies = await ServiceRepository.resolveDependencies(txn, entry.dependencies);

                const mu = new Mutation();
                const { id, ...d } = entry;
                let entity: DgraphEntity = {
                    xid: id,
                    name: d.name,
                    status: d.status,
                    type: d.type,
                    dependencies
                };
                if (resData.all.length > 0) {
                    const { uid } = resData.all[0];
                    entity.uid = uid;
                }
                mu.setSetJson(entity);
                await txn.mutate(mu);
            }
        });
    }

    private static async resolveDependencies(txn: Txn, dependencies: string[]): Promise<DgraphReference[]> {
        const responses = await Promise.all(dependencies.map(ServiceRepository.findById(txn)));

        return responses.map(res => res.getJson())
            .map(json => ({ uid: json.all[0].uid }));
    }

    private static findById(txn: Txn): (id: string) => Promise<Response> {
        return id => txn.query(`{
            all(func: eq(xid, ${id})) { uid }
        }`);
    }
}