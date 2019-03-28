import { Injectable } from '../ioc-container';
import { ServiceEntity, ServiceRepository } from '../repositories/service.repository';
import { ServiceViewModel } from '../contracts/viewmodels/service';

@Injectable()
export class ServiceHandler {

    constructor(private serviceRepository: ServiceRepository) {
    }

    async list(): Promise<ServiceViewModel[]> {
        const entities = await this.serviceRepository.list();
        return entities.map(ServiceHandler.mapServiceEntity);
    }

    private static mapServiceEntity(entity: ServiceEntity): ServiceViewModel {
        return {
            id: entity.uid,
            name: entity.name,
            type: entity.type,
            status: entity.status,
            children: (entity['~dependencies'] || []).map(ServiceHandler.mapServiceEntity)
        };
    }
}