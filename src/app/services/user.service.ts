import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {IAdminInfoResponseInterface} from "../interfaces/iAdminInfoResponse.interface";
import {firstValueFrom} from "rxjs";
import {ITeacherInfoResponseInterface} from "../interfaces/iTeacherInfoResponse.interface";
import {IStudentInfoResponseInterface} from "../interfaces/iStudentInfoResponse.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private adminUrl = `${environment.API_URL}/admins`;
  private teacherUrl = `${environment.API_URL}/teachers`;
  private studentUrl = `${environment.API_URL}/students`;

  getAdminInfo(id:number): Promise<IAdminInfoResponseInterface> {
    return firstValueFrom(this.httpClient.get<IAdminInfoResponseInterface>(`${this.adminUrl}/${id}/info`));
  }

  getTeacherInfo(id:number): Promise<ITeacherInfoResponseInterface> {
    return firstValueFrom(this.httpClient.get<ITeacherInfoResponseInterface>(`${this.teacherUrl}/${id}/info`));
  }

  getStudentInfo(id:number): Promise<IStudentInfoResponseInterface> {
    return firstValueFrom(this.httpClient.get<IStudentInfoResponseInterface>(`${this.studentUrl}/${id}/info`));
  }

}
