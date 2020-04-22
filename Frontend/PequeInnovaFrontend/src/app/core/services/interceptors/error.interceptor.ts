import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from './../authentication/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 404 || err.status===403)
      {
        this.authenticationService.logout();
        location.reload(); //aqui reload(true) esta como deprecated
      }
      const error = err.error.message || err.status.Text;
      return throwError(error);
    }));
  }
}
