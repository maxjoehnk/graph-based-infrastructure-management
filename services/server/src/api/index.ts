import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from '../ioc-container';
import { TestController } from './test.controller';

useContainer(Container);

const server = createExpressServer({
    controllers: [
        TestController
    ]
});

server.listen(process.env.PORT);