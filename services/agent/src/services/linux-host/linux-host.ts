import { Inject, Injectable } from '../../ioc-container';
import { Power } from '../../contracts/services/power';
import { exec } from 'child_process';
import { Updatable } from '../../contracts/services/updatable';
import { Token } from 'typedi';
import { cpuCurrentspeed, cpuTemperature, currentLoad, fsSize, getStaticData, mem } from 'systeminformation';
import { Service } from '../../contracts/services/service';
import {
    HostServiceMetadata,
    HostServiceModel,
    ServiceModel,
    ServiceType
} from '../../contracts/viewmodels/service-model';
import { Metric } from '../../contracts/services/metrics';
import { ServiceStatus } from '../../../../contracts/service-status';
import { HOST_UUID } from '../../consts';

export const UpdaterToken = new Token<Updatable>('linux-updater');

@Injectable()
export class LinuxHostService implements Power, Updatable, Service<HostServiceMetadata> {
    constructor(@Inject(UpdaterToken) private updater: Updatable) {
    }

    get id() {
        return HOST_UUID;
    }

    restart(): void {
        exec('shutdown -r now');
    }

    shutdown(): void {
        exec('shutdown -h now');
    }

    update(): Promise<any> {
        return this.updater.update();
    }

    async toService(): Promise<HostServiceModel> {
        const info = await getStaticData();
        return {
            type: ServiceType.Host,
            id: this.id,
            name: info.os.hostname,
            status: ServiceStatus.Up,
            dependencies: [],
            metadata: info,
            metrics: await LinuxHostService.fetchMetrics()
        };
    }

    private static async fetchMetrics(): Promise<Metric[]> {
        const speed = await cpuCurrentspeed();
        const temperature = await cpuTemperature();
        const load = await currentLoad();
        const memory = await mem();
        const diskUsage = await fsSize();

        return [{
            name: 'cpu_speed',
            value: speed.cores
        }, {
            name: 'cpu_temp',
            value: temperature.cores
        }, {
            name: 'cpu_usage',
            value: load.cpus.map(c => c.load)
        }, {
            name: 'memory_usage',
            value: memory.used
        }, {
            name: 'disk_usage',
            value: diskUsage.map(d => d.used)
        }];
    }
}
