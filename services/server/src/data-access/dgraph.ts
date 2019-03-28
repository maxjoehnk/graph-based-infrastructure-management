import { Injectable } from '../ioc-container';
import { DgraphClient, DgraphClientStub, Operation, Txn } from 'dgraph-js';
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

    async query<T>(query: string): Promise<T> {
        const res = await this.client.newTxn().query(query);
        return res.getJson();
    }

    async transaction(cb: (txn: Txn) => Promise<void>): Promise<void> {
        const txn = this.client.newTxn();
        try {
            await cb(txn);
            await txn.commit();
        }finally {
            await txn.discard();
        }
    }

    private async buildSchema() {
        d('building schema');
        const schema = `
            xid: string @index(exact) .
            name: string @index(fulltext) .
            type: string .
            status: int .
            dependencies: uid @reverse .
        `;
        const op = new Operation();
        op.setSchema(schema);
        await this.client.alter(op);
        d('done');
    }
}