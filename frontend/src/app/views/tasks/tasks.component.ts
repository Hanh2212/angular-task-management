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
  isVisibleTask = false;
  isEdit = false;
  titleModal = '';

  listForm!: FormGroup;
  taskForm!: FormGroup;

  constructor(private taskService: TaskService,
              private modalService: NzModalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', Validators.required]
    });
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
    });
    this.tasks = [
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
    ]
  }

  openCreateModal(): void {
    this.isVisible = true;
    this.listForm.reset();
  }

  openCreateTaskModal(): void {
    this.isEdit = false;
    this.isVisibleTask = true;
    this.taskForm.reset();
  }

  openEditTaskModal(task: Tasks): void {
    this.isVisibleTask = true;
    this.isEdit = true;
    this.taskForm.reset();
    this.taskForm.patchValue({
      id: task._id,
      name: task.title,
      description: task.description
    })
  }

  submitCreateList(): void {
    for (const key in this.listForm.controls) {
      this.listForm.controls[key].markAsDirty();
      this.listForm.controls[key].updateValueAndValidity();
    }
    if (this.listForm.invalid) {
      return;
    }
  }

  submitCreateTask(): void {
    for (const key in this.taskForm.controls) {
      this.taskForm.controls[key].markAsDirty();
      this.taskForm.controls[key].updateValueAndValidity();
    }
    if (this.taskForm.invalid) {
      return;
    }
    console.log('ahihi');
    this.closeTaskModal();
  }

  closeModal(): void {
    this.isVisible = false;
  }

  closeTaskModal(): void {
    this.isVisibleTask = false;
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
