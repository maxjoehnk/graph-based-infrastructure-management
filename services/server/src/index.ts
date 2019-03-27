import 'reflect-metadata';
import './api';
import { build } from 'async-service-builder';
import { Container } from './ioc-container';
import { BackgroundJob, BackgroundJobToken } from './jobs/agent-crawler';

const jobs = Container.getMany<BackgroundJob>(BackgroundJobToken);

for (const job of jobs) {
    build(async() => {
        try {
            await job.run();
        }catch (err) {
            console.error(err);
        }
    })();
}