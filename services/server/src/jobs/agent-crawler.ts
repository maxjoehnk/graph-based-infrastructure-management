import { Injectable } from '../ioc-container';
import { loadSync } from '../config';
import { Token } from 'typedi';
import * as debug from 'debug';
import { HttpClient } from '../http-client';
import { ServiceRepository } from '../repositories/service.repository';
import { ServiceModel } from '../../../agent/src/contracts/viewmodels/service-model';

const d = debug('gim:server:jobs:agent-crawler');

export const BackgroundJobToken = new Token('background-job');

export interface BackgroundJob {
    run(): Promise<void>;
}

@Injectable({ multiple: true, id: BackgroundJobToken })
export class AgentCrawler implements BackgroundJob {
    private agents = loadSync().agents;

    constructor(private serviceRepository: ServiceRepository,
                private http: HttpClient) {
    }


    async run() {
        for (const agent of this.agents) {
            d(`crawling ${agent}`);
            const services = await this.http.get<ServiceModel[]>(`${agent}/api/services`);
            await this.serviceRepository.upsert(services);
        }
    }
}