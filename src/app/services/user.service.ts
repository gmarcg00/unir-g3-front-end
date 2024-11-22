import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {IAdminInfoResponseInterface} from "../interfaces/iAdminInfoResponse.interface";
import {firstValueFrom} from "rxjs";
import {IListResponseInterface} from "../interfaces/iListResponse.interface";
import {IStudentInfoResponseInterface} from "../interfaces/iStudentInfoResponse.interface";
import {ITeacherInfoInterface} from "../interfaces/iTeacherInfoInterface";

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

  getTeacherInfo(id:number): Promise<ITeacherInfoInterface> {
    return firstValueFrom(this.httpClient.get<ITeacherInfoInterface>(`${this.teacherUrl}/${id}/info`));
  }

  getStudentInfo(id:number): Promise<IStudentInfoResponseInterface> {
    return firstValueFrom(this.httpClient.get<IStudentInfoResponseInterface>(`${this.studentUrl}/${id}/info`));
  }

}
