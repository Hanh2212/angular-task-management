import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { bounceOutDownOnLeaveAnimation, fadeInLeftOnEnterAnimation, fadeOutDownOnLeaveAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import gsap from 'gsap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Toast } from 'src/app/core/helper/toastr';
import { Tasks } from 'src/app/model/task.model';
import { ListTaskService } from 'src/app/services/list-task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    fadeInLeftOnEnterAnimation({ anchor: 'enter', duration: 800, delay: 100, translate: '100px' }),
    fadeOutRightOnLeaveAnimation({ anchor: 'leave', duration: 1000, delay: 300, translate: '220px' })
]
})
export class TaskItemComponent implements OnInit, OnChanges {
  @Input() tasks!: Tasks[];
  taskForm!: FormGroup;
  isVisibleTask = false;
  isEdit = false;
  isLoading = true;
  listId = '';
  taskId = '';
  listStatus!: Array<any>;
  filterBtns!: Array<any>;

  @ViewChild('main', {static: true}) main!: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder,
    private toast: Toast,
    private modalService: NzModalService,
    private listService: ListTaskService,
    private cdr: ChangeDetectorRef) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
    }
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.listStatus = [
      { name: 'To do', value: 'todo' },
      { name: 'Doing', value: 'doing' },
      { name: 'Completed', value: 'completed' },
      { name: 'Canceled', value: 'canceled' },
    ];
    this.filterBtns = [
      { name: 'All', value: 'all', class: 'btn btn-secondary mr-4' },
      { name: 'Todo', value: 'todo', class: 'btn btn-primary mr-4' },
      { name: 'Doing', value: 'doing', class: 'btn btn-warning mr-4' },
      { name: 'Completed', value: 'completed', class: 'btn btn-success mr-4' },
      { name: 'Canceled', value: 'canceled', class: 'btn btn-danger mr-4' },
    ];
    // this.initAnimations();
    this.getTasks();
  }

  initAnimations(): void {
    gsap.from(this.main.nativeElement, {
      delay: 1,
      duration: 2,
      opacity: 0,
      y: -50
    });
  }

  filterBy(value: string) {
    if (value === 'all') {
      this.getTasks();
    } else {
      this.tasks = this.tasks.filter(task => task.status === value);
    }
  }

  getTasks(): void {
    this.isLoading = true;
    this.listService.$listIdData.subscribe({
      next: (data) => this.listId = data,
      error: (err) => console.log(err)
    });

    if (this.listId !== '') {
      this.listService.getTasks({ id: this.listId }).subscribe({
        next: (data) => {
          this.tasks = data.body.length > 0 ? data.body : [];
          gsap.from(this.main.nativeElement, {
            delay: 1,
            duration: 2,
            opacity: 0,
            y: -50
          });
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
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
      status: task.status,
      description: task.description,
    })
  }


  showConfirm(_id: string): void {
    this.modalService.confirm({
      nzTitle: 'Xóa nhiệm vụ',
      nzContent: 'Bạn có chắc muốn xóa nhiệm vụ này ?',
      nzOkText: 'Xác nhận',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.listService.deleteTask({ _listId: this.listId, _id: _id })
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
    console.log(this.taskForm.value);
    this.isLoading = true;
    for (const key in this.taskForm.controls) {
      this.taskForm.controls[key].markAsDirty();
      this.taskForm.controls[key].updateValueAndValidity();
    }
    if (this.taskForm.invalid) {
      return;
    }

    const bodyCreate = { _listId: this.listId, title: this.taskForm.value.title, status: this.taskForm.value.status, description: this.taskForm.value.description };
    const bodyEdit = { _listId: this.listId, _id: this.taskId, title: this.taskForm.value.title, status: this.taskForm.value.status, description: this.taskForm.value.description };

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

  onDeleteTaskClick(_id: string) {
    this.listService.deleteTask({ _listId: this.listId, _id: _id })
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
