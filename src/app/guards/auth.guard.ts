import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) return true;
  await Swal.fire({
    title: 'Error !!',
    text: 'Debes entrar en tu cuenta para ver esta página',
    icon: 'error',
    background: "#740001",
    color: "#D4A017"
  });
  await router.navigateByUrl('/sign-in');
  return false;
};
