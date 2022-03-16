import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListTask } from './list.schema';
import { ListService } from './list.service';
import { Task } from './task.schema';

@Controller('lists')
export class ListController {
    constructor(private listService: ListService) {}
    
    @Get()
    getAllLists() {
        return this.listService.getLists();
    }

    //Return all tasks that belong a specific list
    @Get('/:id/tasks')
    getListTasks(@Param('id') id: string) {
        return this.listService.getTasks(id);
    }

    @Post('/:id/tasks')
    async addTask(@Param('id') id: string, @Body('title') title: string): Promise<{message: string}> {
        return this.listService.addTask(id, title);
    }

    @Patch('/:id/tasks/:taskId')
    async updateTask(@Param('id') id: string, @Param('taskId') taskId: string, @Body('title') title: string) {
        this.listService.updateTask(id, taskId, title);
        return {message: 'Cập nhật nhiệm vụ thành công!'};
    }

    @Post()
    addList(@Body('title') title: string): Promise<{message: string}> {
        return this.listService.addList(title);
    }

    @Get(':id')
    getDetailList(@Param('id') id: string) {
        return this.listService.getDetailList(id);
    }

    @Patch(':id')
    updateList(@Param('id') id: string, @Body('updateList') updateList: ListTask) {
        this.listService.updateList(id, updateList);
        return {message: 'Cập nhật danh sách thành công!'};
    }

    @Delete(':id')
    deleteList(@Param('id') id: string) {
        this.listService.deleteList(id);
        return {message: 'Xóa danh sách thành công!'};
    }

    @Delete(':id/tasks/:taskId')
    deleteTask(@Param('id') id: string, @Param('taskId') taskId: string) {
        this.listService.deleteTask(id, taskId);
        return {message: 'Xóa nhiệm vụ thành công!'};
    }
}
