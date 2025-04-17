import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

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

  return next(req);
};
