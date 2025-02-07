import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {
  accessToken: String | undefined;
  constructor(private authService: AuthService, private authGuard: AuthGuard,
    private spinner: NgxSpinnerService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // set global application headers.

    // Set headers for requests that require authorization.
    console.log(this.authGuard.Authenticated);
    if (sessionStorage.getItem("jwt") != null) {
      let auth = "Bearer " + sessionStorage.getItem("jwt");
      console.log("Auth Header");
      request = request.clone({
        setHeaders: {
          'Authorization': auth
        },
      });
      // Request with authorization headers
      return next.handle(request);
    }
    console.log("No Auth Header");
    // Request without authorization header
    return next.handle(request);
  }
}
