import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Toast } from 'src/app/core/helper/toastr';
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
  taskId = '';

  constructor(private fb: FormBuilder,
    private toast: Toast,
    private modalService: NzModalService,
    private listService: ListTaskService,) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      console.log(this.tasks);
    }
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
    });
    this.getTasks();
  }

  getTasks(): void {
    this.listService.$listIdData.subscribe({
      next: (data) => this.listId = data,
      error: (err) => console.log(err)
    });

    if (this.listId !== '') {
      // this.isLoading = true;
      this.listService.getTasks({ id: this.listId }).subscribe({
        next: (data) => {
          this.tasks = data.body.length > 0 ? data.body : null;
          // this.isLoading = false;
        },
        error: (err) => console.log(err)
      });
    }
  }

  openCreateTaskModal(): void {
    this.isEdit = false;
    this.isVisibleTask = true;
    this.taskForm.reset();
  }

  openEditTaskModal(task: Tasks): void {
    this.isVisibleTask = true;
    this.isEdit = true;
    this.taskId = task._id;
    this.taskForm.reset();
    this.taskForm.patchValue({
      title: task.title,
      description: task.description
    })
  }


  showConfirm(_id: string): void {
    this.modalService.confirm({
      nzTitle: 'Xóa nhiệm vụ',
      nzContent: 'Bạn có chắc muốn xóa nhiệm vụ này ?',
      nzOkText: 'Xác nhận',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.listService.deleteTask(_id)
          .subscribe({
            next: (data) => {
              this.toast.customToastr('success', data.body.message);
              this.getTasks();
            },
            error: (err) => {
              this.toast.customToastr('error', err)
            }
          });
      }
    });
  }

  submitCreateTask(): void {
    this.isLoading = true;
    for (const key in this.taskForm.controls) {
      this.taskForm.controls[key].markAsDirty();
      this.taskForm.controls[key].updateValueAndValidity();
    }
    if (this.taskForm.invalid) {
      return;
    }

    const bodyCreate = { _listId: this.listId, title: this.taskForm.value.title, description: this.taskForm.value.description };
    const bodyEdit = { _listId: this.listId, _id: this.taskId, title: this.taskForm.value.title, description: this.taskForm.value.description };

    if (!this.isEdit) {
      this.listService.createTask(bodyCreate).subscribe({
        next: (data) => {
          this.toast.customToastr('success', data.body.message);
          this.closeTaskModal();
          this.getTasks();
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.toast.customToastr('error', err);
        }
      });
    } else {
      this.listService.updateTask(bodyEdit).subscribe({
        next: (data) => {
          this.toast.customToastr('success', data.body.message);
          this.closeTaskModal();
          this.getTasks();
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.toast.customToastr('error', err);
        }
      });
    }
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

  onDeleteTaskClick(_id: string) {
    this.listService.deleteTask(_id)
      .subscribe({
        next: (data) => {
          this.toast.customToastr('success', data.body.message);
          this.getTasks();
        },
        error: (err) => {
          this.toast.customToastr('error', err)
        }
      });
  }
  //
}
