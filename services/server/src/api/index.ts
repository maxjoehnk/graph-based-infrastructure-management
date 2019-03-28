import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from '../ioc-container';
import { ServicesController } from './services.controller';

useContainer(Container);

const server = createExpressServer({
    cors: true,
    controllers: [
        ServicesController
    ]
});

server.listen(process.env.PORT);