import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ListTask } from './list.schema';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class ListService {
  private lists: ListTask[];

  constructor(
    @InjectModel(ListTask.name) private readonly listModel: Model<ListTask>,
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async getLists(): Promise<ListTask[]> {
    this.lists = await this.listModel.find().exec();
    return [...this.lists];
  }

  async getTasks(body: {id: string}): Promise<Task[]> {
    const tasks = await this.taskModel.find({ _listId: body.id });
    return [...tasks] 
  }

  async addTask(body: {_listId: string, title: string, description: string}): Promise<{ message: string }> {
    const newTask = new this.taskModel({
      _listId: body._listId,
      title: body.title,
      description: body.description,
    });
    await newTask.save();
    return { message: 'Thêm mới nhiệm vụ thành công!' };
  }

  async updateTask(body: {_listId: string, _id: string, title: string, description: string}): Promise<any> {
    return await this.taskModel
      .findByIdAndUpdate(
        { _listId: body._listId, _id: body._id}, {_listId: body._listId, _id: body._id, title: body.title, description: body.description}
      )
      .exec();
  }

  async addList(title: string): Promise<{ message: string }> {
    const newList = new this.listModel({
      title: title
    });
    await newList.save();
    return { message: 'Thêm mới danh sách thành công!' };
  }

  async getDetailList(listId: string): Promise<ListTask> {
    const list = await this.listModel.findById(listId);
    return { ...list };
  }

  async updateList(id: string, updateList: ListTask): Promise<ListTask> {
    return await this.listModel.findByIdAndUpdate(id, updateList).exec();
  }

  async deleteList(listId: string): Promise<ListTask> {
    return await this.listModel.findByIdAndDelete(listId).exec();
  }

  async deleteTask(_id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete({_id: _id}).exec();
  }
}