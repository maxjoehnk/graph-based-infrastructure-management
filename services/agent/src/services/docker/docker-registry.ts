import * as Docker from 'dockerode';
import { Injectable } from '../../ioc-container';
import { ServiceRegistry } from '../service-registry';
import { DockerService } from './docker';

@Injectable()
export class DockerServiceRegistry {
    private readonly client: Docker;

    constructor(private serviceRegistry: ServiceRegistry) {
        this.client = new Docker({
            socketPath: '/var/run/docker.sock'
        });
    }

    async update() {
        const containers = await this.client.listContainers({ all: true });

        for (const container of containers) {
            const service = new DockerService(this.client, container.Id);
            this.serviceRegistry.register(service);
        }
    }
}
