import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const helmet = require('helmet');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });
    app.enableCors()
    await app.listen(8000);
}

bootstrap();
