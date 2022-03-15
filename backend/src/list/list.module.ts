import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListSchema, ListTask } from './list.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: ListTask.name, schema: ListSchema}])],
  providers: [ListService],
  controllers: [ListController]
})
export class ListModule {}
