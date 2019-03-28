import { ServiceStatus } from '../../../../contracts/service-status';

export interface ServiceViewModel {
    id: string;
    type: string;
    name: string;
    status: ServiceStatus;
    children: ServiceViewModel[];
}