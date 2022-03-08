import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPayload, UserDetail } from '../model/user-detail.model';

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private credential!: UserDetail | null;

  constructor(private router: Router, private httpClient: HttpClient ) {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this.credential = JSON.parse(savedCredentials);
    }
  }


  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): UserDetail | null {
    return this.credential;
  }

  login(payload: LoginPayload): Observable<UserDetail> {
    return this.httpClient.post<UserDetail>('/auth/login', payload);
  }

  logout() {
    this.setCredentials();
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  setCredentials(credentials?: UserDetail) {
    this.credential = credentials || null;
    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(credentialsKey);
      this.credential = null;
    }
  }
}
