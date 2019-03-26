import * as Docker from 'dockerode';
import { Power } from '../contracts/services/power';
import { Updatable } from '../contracts/services/updatable';
import { Injectable } from '../ioc-container';
import { ServiceModel } from '../contracts/viewmodels/service-model';

@Injectable()
export class DockerServiceRegistry {
    private readonly client: Docker;

    constructor() {
        this.client = new Docker({
            socketPath: '/var/run/docker.sock'
        });
    }

    async list(): Promise<DockerService[]> {
        const containers = await this.client.listContainers();

        return containers.map(c => new DockerService(this.client, c.Id));
    }
}

export class DockerService implements Power, Updatable {
    constructor(private client: Docker, private containerId: string) {
    }

    restart(): Promise<void> {
        return this.client.getContainer(this.containerId).restart();
    }

    shutdown(): Promise<void> {
        return this.client.getContainer(this.containerId).stop();
    }

    update(): Promise<any> {
        throw new Error('Not implemented yet');
    }

    async toService(): Promise<ServiceModel> {
        const container = await this.client.getContainer(this.containerId).inspect();
        return {
            type: 'docker',
            id: this.containerId,
            name: container.Name,
            image: container.Image
        };
    }
}
