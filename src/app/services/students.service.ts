import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {IListResponseInterface} from "../interfaces/iListResponse.interface";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private httpClient = inject(HttpClient);
  private studentsUrl = `${environment.API_URL}/students`;

  getAll(page: number,pageSize: number): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.studentsUrl}?page=${page}&page_size=${pageSize}`));
  }

  deactivateStudent(token:string|null,id:number): Promise<void> {
    const headers = { Authorization: `${token}` };
    return firstValueFrom(
      this.httpClient.patch<void>(`${this.studentsUrl}/${id}/delete`, {}, { headers })
    );
  }
}
