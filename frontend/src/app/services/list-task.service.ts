import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListTaskService {
  headerOptions = {};

  listIdSub = new BehaviorSubject('');
  $listIdData = this.listIdSub.asObservable();

  constructor(private httpClient: HttpClient) {
    this.headerOptions = {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    }
  }

  getLists(): Observable<any> {
    const url = '/lists';
    return this.httpClient.get(url, this.headerOptions);
  }

  getTasksByList(id: string): Observable<any> {
    const url = `/lists?id=${id}` + '/tasks';
    return this.httpClient.get(url, this.headerOptions);
  }

  createList(body: any): Observable<any> {
    const url = '/lists';
    return this.httpClient.post(url, body, this.headerOptions)
  }

  createTask(id: string, title: string, description: string): Observable<any> {
    const url = '/lists?id=' + id + '/tasks';
    return this.httpClient.post(url, title, this.headerOptions);
  }

  updateTask(id: string, taskId: string): Observable<any> {
    const url = '/lists?id=' + id + '/tasks?taskId=' + taskId;
    return this.httpClient.post(url, this.headerOptions);
  }

  deleteTask(id: string, taskId: string): Observable<any> {
    const url = '/lists?id=' + id + '/tasks?taskId=' + taskId;
    return this.httpClient.delete(url, this.headerOptions);
  }

  deleteList(id: string): Observable<any> {
    const url = '/lists?id=' + id;
    return this.httpClient.delete(url, this.headerOptions)
  }



}
