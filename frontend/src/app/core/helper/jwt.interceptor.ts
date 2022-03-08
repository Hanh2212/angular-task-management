import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authService = this.injector.get(AuthenticationService);
    if (!request.url.startsWith('http')) {
      if (authService.isAuthenticated()) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.credentials?.accessToken}`,
          }
        })
      }
    }

    return next.handle(request);
  }
}
