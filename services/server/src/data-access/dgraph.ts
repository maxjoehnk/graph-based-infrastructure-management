import { Injectable } from '../ioc-container';
import { DgraphClientStub, DgraphClient, Operation, Mutation } from 'dgraph-js';
import { loadSync } from '../config';
import * as debug from 'debug';

const d = debug('gim:server:data-access:dgraph');

@Injectable()
export class Dgraph {
    private clientStub: DgraphClientStub;
    private client: DgraphClient;

    constructor() {
        const config = loadSync();
        this.clientStub = new DgraphClientStub(
            config.database
        );
        this.client = new DgraphClient(this.clientStub);
        this.buildSchema()
            .catch(err => console.error(err));
    }

    async insert(data: object[]) {
        const txn = this.client.newTxn();
        try {
            for (const entry of data) {
                const mu = new Mutation();
                mu.setSetJson(entry);
                await txn.mutate(mu);
            }
            await txn.commit();
        }finally {
            await txn.discard();
        }
    }

    private async buildSchema() {
        d('building schema');
        const schema = `
            name: string @index(exact) .
            type: string .
            status: int .        
        `;
        const op = new Operation();
        op.setSchema(schema);
        await this.client.alter(op);
        d('done');
    }
}