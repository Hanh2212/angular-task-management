import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TasksRoutingModule} from './tasks-routing.module';
import {TasksComponent} from './tasks.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzInputModule} from 'ng-zorro-antd/input';
import {TaskItemComponent} from './task-item/task-item.component';
import {ContentLoaderModule} from '@ngneat/content-loader';
import {LoadingContentComponent} from 'src/app/components/loading-content/loading-content.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [TasksComponent, TaskItemComponent, LoadingContentComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzDropDownModule,
    NzInputModule,
    ContentLoaderModule,
    NzIconModule,
    NgSelectModule
  ],
  exports: [TasksComponent]
})
export class TasksModule {
}
