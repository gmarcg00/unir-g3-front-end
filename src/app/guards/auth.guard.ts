import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) return true;
  await router.navigateByUrl('/sign-in');
  return false;
};
