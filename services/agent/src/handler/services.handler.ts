import { Injectable } from '../ioc-container';
import { DockerServiceRegistry } from '../services/docker';

@Injectable()
export class ServicesHandler {
    constructor(private dockerServiceRegistry: DockerServiceRegistry) {
    }

    list() {
        return this.dockerServiceRegistry.list();
    }
}
