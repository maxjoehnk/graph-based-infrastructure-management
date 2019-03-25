import { Injectable } from '../../ioc-container';
import { Updatable } from '../../contracts/updatable';

@Injectable()
export class ArchLinuxUpdater implements Updatable {
    update(): Promise<any> {
        return undefined;
    }
}