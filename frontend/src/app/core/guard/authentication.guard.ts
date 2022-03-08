import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/auth'], {
      replaceUrl: true,
      queryParams: {}
    });
    return false;

  }




}

