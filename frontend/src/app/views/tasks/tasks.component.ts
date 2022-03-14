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
  tasks2!: Tasks[];

  selectedListId!: string;
  isVisible = false;
  isVisibleTask = false;
  isEdit = false;
  isLoading = true;
  titleModal = '';

  listForm!: FormGroup;

  constructor(private taskService: TaskService,
              private modalService: NzModalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.lists = [
      {_id: '1', title: 'List 1'},
      {_id: '2', title: 'List 2'},
      {_id: '3', title: 'List 3'},
      {_id: '4', title: 'List 4'},
      {_id: '5', title: 'List 5'},
    ];

    this.tasks = [
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
      {_id: '1', _listId: 'List 1', title: 'Task1', description: 'Description 1', completed: 'false'},
    ];

    this.tasks2 = [
      {_id: '1', _listId: 'List 1', title: 'Task 2', description: 'Description 2', completed: 'true'},
      {_id: '2', _listId: 'List 2', title: 'Task 2', description: 'Description 2', completed: 'true'},
      {_id: '3', _listId: 'List 3', title: 'Task 2', description: 'Description 2', completed: 'true'},
      {_id: '4', _listId: 'List 4', title: 'Task 2', description: 'Description 2', completed: 'true'},
      {_id: '5', _listId: 'List 5', title: 'Task 2', description: 'Description 2', completed: 'true'},
      {_id: '6', _listId: 'List 6', title: 'Task 2', description: 'Description 2', completed: 'true'},
    ];
    setTimeout(() => {
      this.isLoading = false;
    }, 2000)
  }

  openCreateModal(): void {
    this.isVisible = true;
    this.listForm.reset();
  }

  // openCreateTaskModal(): void {
  //   this.isEdit = false;
  //   this.isVisibleTask = true;
  //   this.taskForm.reset();
  // }

  // openEditTaskModal(task: Tasks): void {
  //   this.isVisibleTask = true;
  //   this.isEdit = true;
  //   this.taskForm.reset();
  //   this.taskForm.patchValue({
  //     id: task._id,
  //     name: task.title,
  //     description: task.description
  //   })
  // }

  showTasks(id: string): void {
    console.log(id);
    this.tasks = [...this.tasks2];
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

  // submitCreateTask(): void {
  //   for (const key in this.taskForm.controls) {
  //     this.taskForm.controls[key].markAsDirty();
  //     this.taskForm.controls[key].updateValueAndValidity();
  //   }
  //   if (this.taskForm.invalid) {
  //     return;
  //   }
  //   console.log('ahihi');
  //   this.closeTaskModal();
  // }

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

  // onTaskClick(task: Tasks) {
  //   // we want to set the task to completed
  //   this.taskService.complete(task).subscribe(() => {
  //     // the task has been set to completed successfully
  //     console.log("Completed successully!");
  //     // task.completed = !task?.completed;
  //   })
  // }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      console.log(res);
    })
  }

  // onDeleteTaskClick(id: string) {
  //   this.taskService.deleteTask(id).subscribe((res: any) => {
  //     this.tasks = this.tasks.filter(val => val._id !== id);
  //     console.log(res);
  //   })
  // }

}
