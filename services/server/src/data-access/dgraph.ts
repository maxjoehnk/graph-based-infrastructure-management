import { Injectable } from '../ioc-container';
import { DgraphClientStub, DgraphClient } from 'dgraph-js';

@Injectable()
export class Dgraph {
    private clientStub: DgraphClientStub;
    private client: DgraphClient;

    constructor() {
        this.clientStub = new DgraphClientStub(
            "localhost:9080"
        );
        this.client = new DgraphClient(this.clientStub);
    }
}