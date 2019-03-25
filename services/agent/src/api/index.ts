import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from '../ioc-container';
import { MetricsController } from './metrics.controller';

useContainer(Container);

const server = createExpressServer({
    controllers: [
        MetricsController
    ]
});

server.listen(process.env.PORT);