import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {ReverseProxyMiddleware} from "./app.middleware";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({})
export class AppModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ReverseProxyMiddleware)
            .forRoutes({path: '*', method: RequestMethod.ALL})
    }
}
