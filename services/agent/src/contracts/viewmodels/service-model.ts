import { Systeminformation } from 'systeminformation';
import { ServiceStatus } from '../../../../contracts/service-status';
import { Metric } from '../services/metrics';

export interface ServiceModel<T> {
    id: string;
    name: string;
    type: ServiceType;
    status: ServiceStatus;
    dependencies: string[];
    metadata?: T;
    metrics?: Metric[];
}

export enum ServiceType {
    Docker = 'docker',
    Host = 'host'
}

export interface DockerServiceMetadata {
    image: string;
}

export type HostServiceMetadata = Systeminformation.StaticData;