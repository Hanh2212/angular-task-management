import { Toast } from 'src/app/core/helper/toastr';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Lists } from 'src/app/model/list.model';
import { Tasks } from 'src/app/model/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { delay, Subscription } from 'rxjs';
import { ListTaskService } from 'src/app/services/list-task.service';
import { slideInLeftOnEnterAnimation, slideOutLeftOnLeaveAnimation } from 'angular-animations';
import gsap from 'gsap';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    slideInLeftOnEnterAnimation({ anchor: 'enter', duration: 800, delay: 300, translate: '100px' }),
    slideOutLeftOnLeaveAnimation({ anchor: 'leave', duration: 800, delay: 200, translate: '220px' })
]
})
export class TasksComponent implements OnInit, OnDestroy {
  lists!: Lists[];
  tasks!: Tasks[];
  selectedListId!: string;
  isVisible = false;
  isVisibleTask = false;
  isEdit = false;
  isLoading = true;
  titleModal = '';
  listId = '';
  listForm!: FormGroup;
  subscription!: Subscription;
  filterBtns!: Array<any>;

  @ViewChild('main', { static: true }) main!: ElementRef<HTMLDivElement>;

  constructor(private listService: ListTaskService,
    private modalService: NzModalService,
    private toast: Toast,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', Validators.required]
    });
    // this.initAnimations();
    this.getLists();
  }

  initAnimations(): void {
    gsap.from(this.main.nativeElement.childNodes, {
      delay: 0.5,
      duration: 0.4,
      opacity: 0.5,
      y: -20,
      stagger: 0.15
    });
  }

  getLists(): void {
    this.isLoading = true;
    this.subscription = this.listService.getLists().pipe(delay(1000))
      .subscribe({
        next: (data) => {
          this.lists = data.body.length > 0 ? data.body : null;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        }
      });
  }

  openCreateModal(): void {
    this.isVisible = true;
    this.listForm.reset();
  }

  showTasks(id: string): void {
    if (id !== '') {
      this.listId = id;
      this.listService.listIdSub.next(id);
      this.listService.getTasks({ id: id }).subscribe({
        next: (data) => this.tasks = data.body.length > 0 ? data.body : [],
        error: (err) => console.log(err)
      });
    }
  }

  submitCreateList(): void {
    this.isLoading = true;
    for (const key in this.listForm.controls) {
      this.listForm.controls[key].markAsDirty();
      this.listForm.controls[key].updateValueAndValidity();
    }
    if (this.listForm.invalid) {
      return;
    }
    this.listService.createList(this.listForm.value)
      .subscribe({
        next: data => {
          this.toast.customToastr('success', data.body.message);
          this.closeModal();
          this.getLists();
          this.isLoading = false;
        }, error: err => {
          this.isLoading = false;
          this.closeModal();
          console.log(err);
        }
      });
  }

  closeModal(): void {
    this.isVisible = false;
  }

  showConfirm(_id: string): void {
    console.log(_id);
    this.modalService.confirm({
      nzTitle: 'Xóa danh sách',
      nzContent: 'Bạn có chắc muốn xóa danh sách này ?',
      nzOkText: 'Xác nhận',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.listService.deleteList({ _id: _id })
          .subscribe({
            next: (data) => {
              this.toast.customToastr('success', data.body.message);
              this.getLists();
            },
            error: (err) => {
              this.toast.customToastr('error', err.toString())
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
