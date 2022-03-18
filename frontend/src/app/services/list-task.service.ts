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

  getTasks(body: any): Observable<any> {
    const url = '/lists/tasks'
    return this.httpClient.post(url, body, this.headerOptions);
  }

  createList(body: any): Observable<any> {
    const url = '/lists';
    return this.httpClient.post(url, body, this.headerOptions)
  }

  createTask(body: {_listId: string, title: string, description: string}): Observable<any> {
    const url = '/lists/tasks/create';
    return this.httpClient.post(url, body, this.headerOptions);
  }

  updateTask(body: {_listId: string, _id: string, title: string, description: string}): Observable<any> {
    const url = '/lists/tasks/update';
    return this.httpClient.patch(url, body, this.headerOptions);
  }

  deleteTask(_id: string): Observable<any> {
    const url = '/lists/tasks?_id=' + _id;
    return this.httpClient.delete(url, this.headerOptions);
  }

  deleteList(id: string): Observable<any> {
    const url = '/lists?id=' + id;
    return this.httpClient.delete(url, this.headerOptions)
  }
}
