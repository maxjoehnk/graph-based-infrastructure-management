import { Injectable } from '../../ioc-container';
import { Updatable } from '../../contracts/services/updatable';
import { UpdaterToken } from './linux-host';

@Injectable(UpdaterToken)
export class ArchLinuxUpdater implements Updatable {
    update(): Promise<any> {
        return undefined;
    }
}
