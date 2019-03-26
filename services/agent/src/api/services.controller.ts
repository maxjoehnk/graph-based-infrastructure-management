import { Controller, Get } from 'routing-controllers';
import { ServiceModel } from '../contracts/viewmodels/service-model';
import { ServicesHandler } from '../handler/services.handler';

@Controller('/api/services')
export class ServicesController {
    constructor(private servicesHandler: ServicesHandler) {
    }

    @Get()
    async listServices(): Promise<ServiceModel[]> {
        return await this.servicesHandler.list() as any[];
    }
}
