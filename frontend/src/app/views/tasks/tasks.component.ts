import { Toast } from 'src/app/core/helper/toastr';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lists } from 'src/app/model/list.model';
import { Tasks } from 'src/app/model/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { delay, Subscription } from 'rxjs';
import { ListTaskService } from 'src/app/services/list-task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
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
  subscription!: Subscription;

  constructor(private listService: ListTaskService,
    private modalService: NzModalService,
    private toast: Toast,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.tasks2 = [
      { _id: '1', _listId: 'List 1', title: 'Task 2', description: 'Description 2', completed: 'true' },
      { _id: '2', _listId: 'List 2', title: 'Task 2', description: 'Description 2', completed: 'true' },
      { _id: '3', _listId: 'List 3', title: 'Task 2', description: 'Description 2', completed: 'true' },
      { _id: '4', _listId: 'List 4', title: 'Task 2', description: 'Description 2', completed: 'true' },
      { _id: '5', _listId: 'List 5', title: 'Task 2', description: 'Description 2', completed: 'true' },
      { _id: '6', _listId: 'List 6', title: 'Task 2', description: 'Description 2', completed: 'true' },
    ];
    this.getLists();
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
    console.log(id);
    if (id !== '') {
      this.listService.listIdSub.next(id);
      this.listService.getTasks({id: id}).subscribe({
        next: (data) => this.tasks = data.body.length > 0 ? data.body : null,
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
    this.listService.createList(this.listForm.value).subscribe(data => {
      this.toast.customToastr('success', data.body.message);
      this.closeModal();
      this.getLists();
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.closeModal();
      console.log(err);
    });
  }

  closeModal(): void {
    this.isVisible = false;
  }

  onDeleteListClick() {
    this.listService.deleteList(this.selectedListId)
      .subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err)
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
