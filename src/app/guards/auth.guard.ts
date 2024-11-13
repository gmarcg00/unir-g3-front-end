import {CanActivateFn, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(token) return true;
  await Swal.fire('Error', 'You must be signed in to access this page.', 'warning');
  await router.navigateByUrl('/sign-in');
  return false;
};
