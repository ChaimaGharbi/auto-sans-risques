import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';

const microserviceOptions = {
    admin: {
        host: 'localhost',
        port: 8001,
    },
    communication: {
        host: 'localhost',
        port: 8002,
    },
    diagnosis: {
        host: 'localhost',
        port: 8003,
    },
    listing: {
        host: 'localhost',
        port: 8004,
    },
    payment: {
        host: 'localhost',
        port: 8005,
    },
    user_management: {
        host: 'localhost',
        port: 8006,
    }
}

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ADMIN',
                transport: Transport.TCP,
                options: microserviceOptions.admin,
            },
            {
                name: 'COMMUNICATION',
                transport: Transport.TCP,
                options: microserviceOptions.communication,
            },
            {
                name: 'DIAGNOSIS',
                transport: Transport.TCP,
                options: microserviceOptions.diagnosis,
            },
            {
                name: 'LISTING',
                transport: Transport.TCP,
                options: microserviceOptions.listing,
            },
            {
                name: 'PAYMENT',
                transport: Transport.TCP,
                options: microserviceOptions.payment,
            },
            {
                name: 'USER_MANAGEMENT',
                transport: Transport.TCP,
                options: microserviceOptions.user_management,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
