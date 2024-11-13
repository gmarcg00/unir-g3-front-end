import { CanActivateFn } from '@angular/router';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {ICustomTokenPayload} from "../interfaces/iCustomTokenPayload.interface";

export const roleGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const data = jwtDecode<ICustomTokenPayload>(token!);
  return data.role === 3;

};
