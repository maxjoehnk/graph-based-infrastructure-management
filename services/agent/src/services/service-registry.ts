import { Injectable } from '../ioc-container';
import { Service } from '../contracts/services/service';

@Injectable()
export class ServiceRegistry {
    private services: Map<string, Service<any>> = new Map();

    register(service: Service<any>) {
        this.services.set(service.id, service);
    }

    unregister(service: Service<any>) {
        this.services.delete(service.id);
    }

    getAll(): Service<any>[] {
        return [...this.services.values()];
    }

    get(id: string): Service<any> {
        return this.services.get(id);
    }
}