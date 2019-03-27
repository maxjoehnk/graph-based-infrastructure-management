import { Service } from './contracts/services/service';
import { Power } from './contracts/services/power';

export class Guard {
    public static isPower<T>(service: Service<T>): service is Service<T> & Power {
        return 'shutdown' in service;
    }

    public static isNull<T>(t: T | null): t is null {
        return t == null;
    }
}