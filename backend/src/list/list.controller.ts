import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListTask } from './list.schema';
import { ListService } from './list.service';
import { Task } from './task.schema';

@Controller('lists')
export class ListController {
    constructor(private listService: ListService) { }

    @Get()
    getAllLists() {
        return this.listService.getLists();
    }

    //fix lấy ds task
    @Post('/tasks')
    getTasks(@Body() body: { id: string }) {
        return this.listService.getTasks(body);
    }

    @Post('/tasks/create')
    async addTask(@Body() body: { _listId: string, title: string, status: string, description: string }): Promise<{ message: string }> {
        return this.listService.addTask(body);
    }

    @Patch('/tasks/update')
    async updateTask(@Body() body: { _listId: string, _id: string, title: string, status: string, description: string }) {
        this.listService.updateTask(body);
        return { message: 'Cập nhật nhiệm vụ thành công!' };
    }

    @Post()
    addList(@Body('title') title: string): Promise<{ message: string }> {
        return this.listService.addList(title);
    }

    @Get(':id')
    getDetailList(@Param('id') id: string) {
        return this.listService.getDetailList(id);
    }

    @Patch(':id')
    updateList(@Param('id') id: string, @Body('updateList') updateList: ListTask) {
        this.listService.updateList(id, updateList);
        return { message: 'Cập nhật danh sách thành công!' };
    }

    @Delete(':id')
    deleteList(@Param('id') id: string) {
        this.listService.deleteList(id);
        return { message: 'Xóa danh sách thành công!' };
    }

    @Delete('/tasks/delete')
    deleteTask(@Param('_id') _id: string) {
        this.listService.deleteTask(_id);
        return { message: 'Xóa nhiệm vụ thành công!' };
    }
}