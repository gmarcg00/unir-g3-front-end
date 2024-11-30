import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) return true;
  await Swal.fire({
    title: 'Error',
    text: 'You must be signed in to access this page.',
    icon: 'warning',
    timer: 3000,
    timerProgressBar: true,
  });
  await router.navigateByUrl('/sign-in');
  return false;
};
