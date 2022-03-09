import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Lists } from 'src/app/model/list.model';
import { Tasks } from 'src/app/model/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  lists!: Lists[];
  tasks!: Tasks[];

  selectedListId!: string;
  isVisible = false;
  titleModal = '';

  listForm!: FormGroup;

  constructor(private taskService: TaskService,
              private modalService: NzModalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', Validators.required]
    });
    this.tasks = [
      {_id: '1', _listId: 'List 1', title: 'Task1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', completed: 'false'},
    ]
  }

  openCreateModal(): void {
    this.isVisible = true;
    this.titleModal = 'Thêm mới danh sách';
    this.modalService.confirm({
      nzTitle: 'Thêm mới danh sách',
      nzContent: 'Bla bla ...',
      nzOkText: 'OK',
      nzCancelText: 'Cancel'
    });
  }

  closeModal(): void {
    this.isVisible = false;
  }

  submitCreate(): void {

  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Xóa nhiệm vụ',
      nzContent: 'Bạn có chắc muốn xóa nhiệm vụ này ?',
      nzOkText: 'Xác nhận',
      nzCancelText: 'Hủy'
    });
  }

  onTaskClick(task: Tasks) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      // task.completed = !task?.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      // this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

}
