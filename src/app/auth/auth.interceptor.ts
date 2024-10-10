import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('access_token');
  let authReq = req;
  if (authToken) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
  }
  const router = inject(Router);

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        localStorage.removeItem('access_token');
        router.navigateByUrl('/unauthorize');
        return of(err.message);
      }
      else if (err.status === 403) {
        localStorage.removeItem('access_token');
        router.navigateByUrl('/access-denied');
      }
      return throwError(err);
    })
  );
};
