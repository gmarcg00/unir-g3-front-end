import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IListResponseInterface } from "../interfaces/iListResponse.interface";
import { firstValueFrom } from "rxjs";
import { ITeacherInfoInterface } from '../interfaces/iTeacherInfoInterface';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private httpClient = inject(HttpClient);
  private teachersUrl = `${environment.API_URL}/teachers`;
  private knowledgeBranchesUrl = `${environment.API_URL}/knowledge-branches`;

  getTeachers(page: number, pageSize: number, branches: number[], prices: number[], averages: number[], latitude: number, longitude: number, range: number): Promise<IListResponseInterface> {
    let url: string = `${this.teachersUrl}?page=${page}&page_size=${pageSize}`;

    if (branches.length > 0) { url += `&branches=${branches.join(',')}`; }
    if (prices.length > 0) { url += `&price_hour=${prices.join(',')}`; }
    if (averages.length > 0) { url += `&average_rating=${averages.join(',')}`; }
    if (latitude !== -1 && longitude !== -1 && range !== -1) { url += `&latitude=${latitude}&longitude=${longitude}&range=${range}`; }

    return firstValueFrom(this.httpClient.get<IListResponseInterface>(url));
  }

  getNonActiveTeachers(page: number, pageSize: number): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.teachersUrl}?active=0&page=${page}&page_size=${pageSize}`));
  }

  getBestAverageRatingTeachers(page: number, pageSize: number): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.teachersUrl}?page=${page}&page_size=${pageSize}&sort=average_rating&order=DESC`));
  }

  activateTeacher(token: string | null, id: number): Promise<void> {
    const headers = { Authorization: `${token}` };
    return firstValueFrom(
      this.httpClient.post<void>(`${this.teachersUrl}/${id}/activate`, {}, { headers })
    );
  }

  getKnowledgeBranches(): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.knowledgeBranchesUrl}`));
  }

  getStudentsByTeacher(id: number): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.teachersUrl}/${id}/students`));
  }

  getTeacherInfo(id: number): Promise<ITeacherInfoInterface> {
    return firstValueFrom(this.httpClient.get<ITeacherInfoInterface>(`${this.teachersUrl}/${id}/info`));
  }

  getIsTeacherActivated(id: number): boolean {
    let active = false;
    this.getTeacherInfo(id)
      .then((data) => {
        return active = data.active;
      });
    return active;
  }

}
