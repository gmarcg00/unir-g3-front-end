import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {ICustomTokenPayload} from "../interfaces/iCustomTokenPayload.interface";


type LoginResponse = {token: string};
type SignUpResponse = {token: string};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private loginUrl = `${environment.API_URL}/auth/login`;
  private studentSignupUrl = `${environment.API_URL}/auth/students/register`;
  private teacherSignupUrl = `${environment.API_URL}/auth/teachers/register`;


  signIn(email: string, password: string): Promise<LoginResponse>{
    return firstValueFrom(this.httpClient.post<LoginResponse>(this.loginUrl, {email, password}));
  }

  studentSignUp(name: string, lastNames: string, phone: string, avatar: string, username: string, email: string, password: string, latitude: number, longitude: number):Promise<SignUpResponse>{
    console.log(latitude,longitude)
    return firstValueFrom(this.httpClient.post<SignUpResponse>(this.studentSignupUrl, {name,last_names: lastNames, phone, image:avatar, username, email, password, latitude, longitude}));
  }

  teacherSignUp(name: string, lastNames: string, phone: string, avatar: string,knowledgeBranches: number[],about: string,priceHour: number, username: string, email: string, password: string ,latitude: number, longitude: number):Promise<SignUpResponse>{
    console.log(latitude,longitude)
    return firstValueFrom(this.httpClient.post<SignUpResponse>(this.teacherSignupUrl, {name,last_names: lastNames, phone, image:avatar, branches: knowledgeBranches, description:about, price_hour: priceHour, username, email, password, latitude, longitude}));
  }

  signOut(): void {
    localStorage.removeItem("token");
  }

  isLogged(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getTokenPayload(): ICustomTokenPayload | null {
    const token = localStorage.getItem("token");
    if(token){
      return jwtDecode<ICustomTokenPayload>(token);
    }
    return null;
  }

  getRole(): number {
    const token = localStorage.getItem("token");
    if(token){
      const data = jwtDecode<ICustomTokenPayload>(token);
      return data.role;
    }
    return 0;
  }

  getId(): number {
    const token = localStorage.getItem("token");
    if(token){
      const data = jwtDecode<ICustomTokenPayload>(token);
      return data.id;
    }
    return 0;
  }
}
