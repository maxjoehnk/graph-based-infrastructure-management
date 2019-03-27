import * as Docker from 'dockerode';
import { ContainerInspectInfo } from 'dockerode';
import { Power } from '../../contracts/services/power';
import { Updatable } from '../../contracts/services/updatable';
import { DockerServiceMetadata, ServiceModel, ServiceType } from '../../contracts/viewmodels/service-model';
import { Service } from '../../contracts/services/service';
import { ServiceStatus } from '../../../../contracts/service-status';
import { HOST_UUID } from '../../consts';

export class DockerService implements Power, Updatable, Service<DockerServiceMetadata> {
    constructor(private client: Docker, private containerId: string) {
    }

    get id() {
        return this.containerId;
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

    async toService(): Promise<ServiceModel<DockerServiceMetadata>> {
        const container = await this.client.getContainer(this.containerId).inspect();
        return {
            type: ServiceType.Docker,
            id: this.containerId,
            name: container.Name,
            status: DockerService.getStatus(container),
            dependencies: [
                HOST_UUID
            ],
            metadata: {
                image: container.Image
            }
        };
    }

    private static getStatus(container: ContainerInspectInfo): ServiceStatus {
        if (container.State.Running) {
            return ServiceStatus.Up;
        }else {
            return ServiceStatus.Down;
        }
    }
}
