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
  private knowledgeBranchesUrl = `${environment.API_URL}/knowledge-branches`;

  getTeachers(page: number,pageSize: number,branches: number[], prices: number[], averages: number[]): Promise<IListResponseInterface> {
    let url: string = `${this.teachersUrl}?page=${page}&page_size=${pageSize}`;

    if (branches.length > 0) { url += `&branches=${branches.join(',')}`;}
    if (prices.length > 0) {url += `&price_hour=${prices.join(',')}`;}
    if (averages.length > 0) {url += `&average_rating=${averages.join(',')}`;}

    return firstValueFrom(this.httpClient.get<IListResponseInterface>(url));
  }

  getNonActiveTeachers(page: number,pageSize: number): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.teachersUrl}?active=0&page=${page}&page_size=${pageSize}`));
  }

  getBestAverageRatingTeachers(page: number,pageSize: number): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.teachersUrl}?page=${page}&page_size=${pageSize}&sort=average_rating&order=DESC`));
  }

  activateTeacher(token:string|null,id:number): Promise<void> {
    const headers = { Authorization: `${token}` };
    return firstValueFrom(
      this.httpClient.post<void>(`${this.teachersUrl}/${id}/activate`, {}, { headers })
    );
  }

  getKnowledgeBranches(): Promise<IListResponseInterface> {
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.knowledgeBranchesUrl}`));
  }
}
