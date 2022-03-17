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
  }

  getLists(): void {
    this.isLoading = true;
    this.subscription = this.listService.getLists().pipe(delay(1000)).subscribe(data => {
      console.log(data);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  openCreateModal(): void {
    this.isVisible = true;
    this.listForm.reset();
  }

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

  closeModal(): void {
    this.isVisible = false;
  }

  onDeleteListClick() {
    this.listService.deleteList(this.selectedListId).subscribe((res: any) => {
      console.log(res);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
