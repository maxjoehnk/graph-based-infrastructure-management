import { Inject, Injectable } from '../../ioc-container';
import { Power } from '../../contracts/services/power';
import { exec } from 'child_process';
import { Updatable } from '../../contracts/services/updatable';
import { Token } from 'typedi';

export const UpdaterToken = new Token<Updatable>('linux-updater');

@Injectable()
export class LinuxHostService implements Power, Updatable {
    constructor(@Inject(UpdaterToken) private updater: Updatable) {
    }

    restart(): void {
        exec('shutdown -r now');
    }

    shutdown(): void {
        exec('shutdown -h now')
    }

    update(): Promise<any> {
        return this.updater.update();
    }
}
