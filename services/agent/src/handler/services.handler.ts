import { Injectable } from '../ioc-container';
import { DockerServiceRegistry } from '../services/docker';

@Injectable()
export class ServicesHandler {
    constructor(private dockerServiceRegistry: DockerServiceRegistry) {
    }

    async list() {
        const services = await this.dockerServiceRegistry.list();

        return await Promise.all(services.map(s => s.toService()));
    }
}
