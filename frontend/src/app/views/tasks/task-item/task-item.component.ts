import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Tasks } from 'src/app/model/task.model';
import { ListTaskService } from 'src/app/services/list-task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnChanges {
  @Input() tasks!: Tasks[];
  taskForm!: FormGroup;
  isVisibleTask = false;
  isEdit = false;
  isLoading = true;
  listId = '';

  constructor(private fb: FormBuilder,
              private modalService: NzModalService,
              private listService: ListTaskService,) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000)
    }
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000)
    this.getTasks();
  }

  getTasks(): void {
    this.listService.$listIdData.subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    });
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


  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Xóa nhiệm vụ',
      nzContent: 'Bạn có chắc muốn xóa nhiệm vụ này ?',
      nzOkText: 'Xác nhận',
      nzCancelText: 'Hủy'
    });
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

  closeTaskModal(): void {
    this.isVisibleTask = false;
  }

  onTaskClick(task: Tasks) {
    // we want to set the task to completed
    // this.listService.complete(task).subscribe(() => {
    //   // the task has been set to completed successfully
    //   console.log("Completed successully!");
    //   // task.completed = !task?.completed;
    // })
  }

  onDeleteTaskClick(id: string, taskId: string) {
    this.listService.deleteTask(id, taskId)
      .subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err)
      });
  }
//
}
