import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { DatabaseProvider } from 'sigasac-db';

import { HttpExceptionFilter, MAIN } from 'sigasac-utils';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalFilters(new HttpExceptionFilter());

    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('Siga SAC API, módulo principal')
        .setDescription(`${MAIN.description}`)
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(`${MAIN.name}/apiDoc`, app, document);

    await app.listen(MAIN.port, async () => {
        const connection = await DatabaseProvider.getConnection();

        const result = await connection.query('SELECT 1 + 1');

        if (result.length && connection.isConnected) {
            Logger.log(
                `successful connection to the database ${connection.name}!`
            );
        }
    });
}

bootstrap();
