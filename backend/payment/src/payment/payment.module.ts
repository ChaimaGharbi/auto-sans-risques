import {Module} from '@nestjs/common';
import {MongooseModule, getConnectionToken} from '@nestjs/mongoose';
import {Connection} from 'mongoose';
import {Expert, ExpertSchema} from './entities/expert.entity';
import {Payment, PaymentSchema} from './entities/payment.entity';
import {PaymentController} from './payment.controller';
import {PaymentService} from './payment.service';
import * as AutoIncrementFactory from 'mongoose-sequence';
import {BullModule} from '@nestjs/bull';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Payment.name,
                useFactory: async (connection: Connection) => {
                    const schema = PaymentSchema;
                    const AutoIncrement = AutoIncrementFactory(connection);
                    schema.plugin(AutoIncrement, {inc_field: 'paymentId', start_seq: 1000000});
                    return schema;
                },
                inject: [getConnectionToken()]
            },
            {
                name: Expert.name,
                useFactory: () => {
                    const schema = ExpertSchema;
                    return schema;
                }
            }
        ]),
        BullModule.registerQueue({
            name: 'invoicejob'
        })
    ],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {
}
