import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(localStorage.getItem("token"));

  const router = inject(Router);

  const isPublicRequest = req.url.includes("authentication");
  const token = localStorage.getItem("token");


  if(!token && !isPublicRequest) {
    router.navigate(['/']);
    return EMPTY;
  }


  if(!isPublicRequest) {
    req = req.clone(
      {
        setHeaders: {
          Authorization : `Bearer ${token}`
        }
      }
    )
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        router.navigate(['/']);
        return EMPTY;
      }

      return throwError(() => error);
    })
  );
};
