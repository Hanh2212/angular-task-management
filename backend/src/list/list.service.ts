import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ListTask } from './list.schema';
import { Model } from 'mongoose';

@Injectable()
export class ListService {
    private lists: ListTask[];

    constructor(
        @InjectModel(ListTask.name) private readonly listModel: Model<ListTask>
    ) {}

    async addList(title: string): Promise<{message: string}> {
        const newList = new this.listModel({
            title: title
        });
        const result = await newList.save();
        return {message: 'Thêm mới danh sách thành công!'}
    }

    getLists() {
        return [...this.lists];
    }

    getDetailList(listId: string) {
        const list = this.findList(listId)[0];
        return {...list};
    }

    updateList(listId: string, title: string) {
        const [list, index] = this.findList(listId);
        const updatedList = {...list};
        if (title) {
            updatedList.title = title;
        }
    }

    deleteList(listId: string) {
        const idx = this.listModel.findById(listId)[1];
        this.lists.splice(idx, 1);
    }

    findList(id: string): [ListTask, number] {
        const listIndex = this.lists.findIndex(list => list.id === id);
        const list = this.lists[listIndex];
        if (!list) {
            throw new NotFoundException('Không tìm thấy danh sách');
        }
        return [list, listIndex];
    }
}
