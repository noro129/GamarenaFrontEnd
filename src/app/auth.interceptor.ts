import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  const token = localStorage.getItem("token");
  if(!token) {
    router.navigate(['/']);
    return EMPTY;
  }

  const isPublicRequest = req.url.includes("authentication");

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
