import { Injectable } from '../ioc-container';
import { loadSync } from '../config';
import { Token } from 'typedi';
import { Dgraph } from '../data-access/dgraph';
import * as debug from 'debug';
import { HttpClient } from '../http-client';

const d = debug('gim:server:jobs:agent-crawler');

export const BackgroundJobToken = new Token('background-job');

export interface BackgroundJob {
    run(): Promise<void>;
}

@Injectable({ multiple: true, id: BackgroundJobToken })
export class AgentCrawler implements BackgroundJob {
    private agents = loadSync().agents;

    constructor(private dgraph: Dgraph,
                private http: HttpClient) {
    }


    async run() {
        for (const agent of this.agents) {
            d(`crawling ${agent}`);
            const services = await this.http.get(`${agent}/api/services`);
            await this.dgraph.insert(services);
        }
    }
}