import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {ReverseProxyMiddleware} from "./app.middleware";
import {Proxy} from "./proxy.factory";

@Module({
    imports: [],
    controllers: [],
    providers: [Proxy],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ReverseProxyMiddleware)
            .forRoutes({path: '*', method: RequestMethod.ALL});
    }
}

