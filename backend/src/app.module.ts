import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://hanhdh:Hanh1997@tasks.7upq6.mongodb.net/test?retryWrites=true&w=majority'),
            ServeStaticModule.forRoot({
              rootPath: join(__dirname, '../..', 'frontend/dist/frontend')
            })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}