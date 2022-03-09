import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = 'http://localhost:3000';
  headerOptions = {};

  constructor(private httpClient: HttpClient) {
    this.headerOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as "response",
    };
  }

  get(): Observable<any> {
    const url = this.apiUrl + '/listTask';
    return this.httpClient.get(url, this.headerOptions)
  }

  post(body: any): Observable<any> {
    const url = this.apiUrl + '/create';
    return this.httpClient.post(url, body, this.headerOptions);
  }

  patch(body: any): Observable<any> {
    const url = this.apiUrl + '/update';
    return this.httpClient.patch(url, body, this.headerOptions);
  }

  complete(body: any): Observable<any> {
    const url = this.apiUrl + '/complete';
    return this.httpClient.patch(url, body, this.headerOptions);
  }

  deleteList(id: string): Observable<any> {
    const url = this.apiUrl + '/delete' + id;
    return this.httpClient.delete(url);
  }

  deleteTask(id: string): Observable<any> {
    const url = this.apiUrl + '/delete' + id;
    return this.httpClient.delete(url);
  }


}
