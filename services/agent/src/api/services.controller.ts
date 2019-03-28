import { Controller, Get, OnUndefined, Param, Put } from 'routing-controllers';
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

    @Put('/:id/shutdown')
    @OnUndefined(204)
    async shutdown(@Param('id') id: string): Promise<void> {
        return await this.servicesHandler.shutdown(id);
    }

    @Put('/:id/restart')
    @OnUndefined(204)
    async restart(@Param('id') id: string): Promise<void> {
        return await this.servicesHandler.restart(id);
    }
}
