import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
          }
        ]
      },
      {
        path: 'tasks',
        children: [
          {
            path: '',
            loadChildren: () => import('./views/tasks/tasks.module').then(m => m.TasksModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
