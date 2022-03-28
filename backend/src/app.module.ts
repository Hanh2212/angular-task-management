import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://hanhdh:Hanh1997@tasks.7upq6.mongodb.net/test?retryWrites=true&w=majority'),
    AuthModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../', 'front/'),
  }),
  PassportModule.register({ defaultStrategy: 'jwt' }),
    ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }