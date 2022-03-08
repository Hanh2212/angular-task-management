import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === '401' && !this.router.url.startsWith('/auth')) {
          this.authService.logout();
        }
        if (err.status === '403') {
          this.authService.logout();
        }

        const error = err.error || err.message;
        return throwError(error);
      })
    );
  }
}
