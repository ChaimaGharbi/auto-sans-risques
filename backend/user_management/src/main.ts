import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as admin from 'firebase-admin';
import {ServiceAccount} from 'firebase-admin';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    console.log("port", process.env.PORT)
    await app.listen(process.env.PORT || 8006);

    console.log(`Application is running on: ${await app.getUrl()}`);

    const adminConfig: ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    };

    admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        storageBucket: 'karhabtek-5df57.appspot.com'
    });
}

bootstrap();
