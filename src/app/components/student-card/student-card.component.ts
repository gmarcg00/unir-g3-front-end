import { Component, Input, Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

interface StudentCard {
  id: number;
  name: string;
  lastNames: string;
  image: string;
  teacherRating: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private httpClient = inject(HttpClient);
  private teachersUrl = `${environment.API_URL}/teachers`;

  sendContactRequest(token: string | null, studentId: number): Promise<void> {
    const headers = { Authorization: `${token}` };
    return firstValueFrom(
      this.httpClient.post<void>(`${this.teachersUrl}/contact/${studentId}`, {}, { headers })
    );
  }
}

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements StudentCard {
  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() lastNames: string = "";
  @Input() image: string = "";
  @Input() teacherRating: number = 0;

  public authService = inject(AuthService);
  private studentsService = inject(StudentsService);
  private teacherService = inject(TeacherService);

  async deactivateStudent(id: number): Promise<void> {
    try {
      const token: string | null = this.authService.getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }
      await this.studentsService.deactivateStudent(token, id);
      await Swal.fire("Success", "Student deactivated successfully", "success");
      window.location.reload();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while deactivating the student";
      await Swal.fire("Error", errorMessage, "error");
    }
  }

  async contactTeachers(): Promise<void> {
    try {
      const token: string | null = this.authService.getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }
      await this.teacherService.sendContactRequest(token, this.id);
      await Swal.fire("Success", "Contact request sent successfully", "success");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while sending contact request";
      await Swal.fire("Error", errorMessage, "error");
    }
  }

  getFullName(): string {
    return `${this.name} ${this.lastNames}`;
  }
}