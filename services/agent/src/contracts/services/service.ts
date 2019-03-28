import { ServiceModel } from '../viewmodels/service-model';

export interface Service<T> {
    readonly id: string;

    toService(): Promise<ServiceModel>;
}