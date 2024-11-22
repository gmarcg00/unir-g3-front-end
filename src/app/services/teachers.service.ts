import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IListResponseInterface} from "../interfaces/iListResponse.interface";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private httpClient = inject(HttpClient);
  private teachersUrl = `${environment.API_URL}/teachers`;

  getNonActiveTeachers(page: number,pageSize: number): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.teachersUrl}?active=0&page=${page}&page_size=${pageSize}`));
  }

  activateTeacher(token:string|null,id:number): Promise<void> {
    const headers = { Authorization: `${token}` };
    return firstValueFrom(
      this.httpClient.post<void>(`${this.teachersUrl}/${id}/activate`, {}, { headers })
    );
  }
}
