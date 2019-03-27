import { Injectable } from '../ioc-container';
import { ServiceRegistry } from '../services/service-registry';
import { Guard } from '../guard';

@Injectable()
export class ServicesHandler {
    constructor(private serviceRegistry: ServiceRegistry) {
    }

    async list() {
        const services = this.serviceRegistry.getAll();

        return await Promise.all(services.map(s => s.toService()));
    }

    async shutdown(id: string) {
        const service = this.serviceRegistry.get(id);

        if (Guard.isNull(service)) {
            throw new Error('Not found');
        }

        if (!Guard.isPower(service)) {
            throw new Error('Not applicable');
        }

        await service.shutdown();
    }

    async restart(id: string) {
        const service = this.serviceRegistry.get(id);

        if (Guard.isNull(service)) {
            throw new Error('Not found');
        }

        if (!Guard.isPower(service)) {
            throw new Error('Not applicable');
        }

        await service.restart();
    }
}