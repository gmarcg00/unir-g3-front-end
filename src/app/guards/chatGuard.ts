import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from "../services/auth.service";
import {ICustomTokenPayload} from "../interfaces/iCustomTokenPayload.interface";


export const chatGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const data = authService.getTokenPayload() as ICustomTokenPayload;

      if (data.role === 3 || data.role === 2) {
        return true;
      }
    } catch (error) {}
  }

  Swal.fire('Error', 'You must be signed in to access this page.', 'warning').then(() => {
    router.navigateByUrl('/sign-in');
  });

  return false;
};
