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

  //Find tasks belong a specific list
  async getTasks(id: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ _listId: id });
    return [...tasks] 
  }

  async addTask(id: string, title: string): Promise<{ message: string }> {
    const newTask = new this.taskModel({
      _listId: id,
      title: title,
    });
    await newTask.save();
    return { message: 'Thêm mới nhiệm vụ thành công!' };
  }

  async updateTask(id: string, taskId: string, title: string): Promise<any> {
    return await this.taskModel
      .findByIdAndUpdate(
        { _id: taskId, _listId: id}, {_id: taskId, _listId: id, title: title}
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

  async deleteTask(id: string, taskId: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete({_id: taskId, _listId: id}).exec();
  }
}
