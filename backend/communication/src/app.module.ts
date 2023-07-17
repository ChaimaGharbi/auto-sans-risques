import * as multer from 'multer';
import {ConfigModule} from './config/mongo/config.module';
import {ConfigService} from './config/mongo/config.service';
import {MailerModule} from './config/mailer/mailer.module';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {AdsModule} from './ads/ads.module';
import {BullModule} from '@nestjs/bull';
import {ArticleModule} from "./article/article.module";
import {ContactModule} from "./contact/contact.module";

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.getMongoConfig()
        }),
        MailerModule,
        MulterModule.register({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 10 * 1024 * 1024
            }
        }),
        AdsModule,
        ArticleModule,
        ContactModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
