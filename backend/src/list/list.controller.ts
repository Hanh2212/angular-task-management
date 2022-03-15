import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
    constructor(private listService: ListService) {}

    @Post()
    async addList(@Body('title') title: string): Promise<{message: string}> {
        return this.listService.addList(title);
    }

    @Get()
    getAllLists() {
        return this.listService.getLists();
    }

    @Get(':id')
    getDetailList(@Param('id') id: string) {
        return this.listService.getDetailList(id);
    }

    @Patch(':id')
    updateList(@Param('id') id: string, @Body('title') title: string) {
        this.listService.updateList(id, title);
        return null;
    }

    @Delete(':id')
    deleteList(@Param('id') id: string) {
        this.listService.deleteList(id);
        return null;
    }
}
