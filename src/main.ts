import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bodyParser:true
  });

  const options = new DocumentBuilder()
    .setTitle('Puppetry API platform')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('puppetry platform')
    .addBearerAuth()
    .build(); 
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/api", app, document);

  app.enableCors()
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.text({type:'text/html'}));
  app.use(bodyParser.json());
  let PORT = process.env.PORT || 3000;
  await app.listen(PORT);

}
bootstrap(); 

