import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cors = require('cors');

const whitelist = ['http://localhost:3001', 'null'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Ensure that all routes are protected
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cors(corsOptions));
  await app.listen(3000);
}
bootstrap();
