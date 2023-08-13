import * as multer from 'multer';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {AdsModule} from './ads/ads.module';
import {ArticleModule} from "./article/article.module";
import {ContactModule} from "./contact/contact.module";
import {AssistanceModule} from "./assistance/assistance.module";
import {PackModule} from "./pack/pack.module";


@Module({
    imports: [
        // @ts-ignore
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: 'mongodb+srv://' +
                    process.env.MONGO_USER +
                    ':' +
                    process.env.MONGO_PASSWORD +
                    '@' +
                    process.env.MONGO_HOST +
                    '/' +
                    process.env.MONGO_DATABASE +
                    '?retryWrites=true&w=majority',
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        }),
        MulterModule.register({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 10 * 1024 * 1024
            }
        }),
        AdsModule,
        ArticleModule,
        ContactModule,
        AssistanceModule,
        PackModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
