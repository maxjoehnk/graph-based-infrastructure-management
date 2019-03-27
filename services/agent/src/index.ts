import 'reflect-metadata';
import './api';
import { Container } from './ioc-container';
import { ServiceRegistry } from './services/service-registry';
import { LinuxHostService, UpdaterToken } from './services/linux-host/linux-host';
import { ArchLinuxUpdater } from './services/linux-host/arch-linux-updater';
import { DockerServiceRegistry } from './services/docker/docker-registry';

const registry = Container.get(ServiceRegistry);

Container.set(UpdaterToken, ArchLinuxUpdater);

registry.register(Container.get(LinuxHostService));

const dockerRegistry = Container.get(DockerServiceRegistry);

dockerRegistry.update()
    .catch(err => console.error(err));