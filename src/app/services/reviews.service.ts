import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { IReview } from '../interfaces/iReview';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }

  private httpClient = inject(HttpClient);
  private studentsUrl = `${environment.API_URL}/students`;



  // recoger los rate del profesors
  getTeacherRate(student_id: number, teacher_id: number): Promise<IReview> {
    const url = `${this.studentsUrl}/${student_id}/rates-teacher/${teacher_id}`;
    const resp = firstValueFrom(this.httpClient.get<IReview>(url));
    return resp;

  }

  // enviar al  datos al backend
  // puede pasar que devuelva un error
  insertReview(student_id: number, teacher_id: number, rating: number, text_rating: string) {
    if (text_rating === "") {
      text_rating = "Sin reseña de texto";
    }
    const url = `${this.studentsUrl}/${student_id}/rates-teacher/${teacher_id}`;
    const resp = firstValueFrom(this.httpClient.post(url, { rating, text_rating }));
    return resp;
  }

}
