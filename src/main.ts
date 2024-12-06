import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; 

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api/v1');

    const config = new DocumentBuilder()
	.setTitle('YeetCode')
	.setDescription('Like leetcode but worse')
	.setVersion('1.0')
	.build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
