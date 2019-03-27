import { ServiceModel } from '../viewmodels/service-model';
import { ServiceStatus } from '../../../../contracts/service-status';

export interface Service<T> {
    readonly id: string;
    toService(): Promise<ServiceModel<T>>;
}