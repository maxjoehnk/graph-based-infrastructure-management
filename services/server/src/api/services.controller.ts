import { Controller, Get } from 'routing-controllers';
import { ServiceHandler } from '../handler/service.handler';
import { ServiceViewModel } from '../contracts/viewmodels/service';

@Controller('/api/services')
export class ServicesController {
    constructor(private serviceHandler: ServiceHandler) {
    }

    @Get()
    async listServices(): Promise<ServiceViewModel[]> {
        return this.serviceHandler.list();
    }
}