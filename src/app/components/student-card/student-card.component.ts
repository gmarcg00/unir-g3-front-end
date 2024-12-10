import { Component, inject, Input } from '@angular/core';
import { NgIf, DecimalPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { StudentsService } from "../../services/students.service";
import { TeacherService } from "../../services/teacher.service";

interface StudentCard {
  id: number;
  name: string;
  lastNames: string;
  image: string;
  teacherRating: number;
}

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent implements StudentCard {
  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() lastNames: string = "";
  @Input() image: string = "";
  @Input() teacherRating: number = 0;

  readonly authService = inject(AuthService);
  readonly studentsService = inject(StudentsService);
  readonly teacherService = inject(TeacherService);

  /**
   * Deactivates a student account
   * @param id Student ID to deactivate
   */
  async deactivateStudent(id: number): Promise<void> {
    try {
      const token = this.authService.getToken();
      await this.studentsService.deactivateStudent(token, id);
      await Swal.fire("Success", "Student deactivated successfully", "success");
      window.location.reload();
    } catch (error) {
      await Swal.fire("Error", "An error occurred while deactivating the student", "error");
    }
  }

  /**
   * Sends contact request to teachers
   */
  async contactTeachers(): Promise<void> {
    try {
      const token = this.authService.getToken();
      await this.teacherService.sendContactRequest(token, this.id);
      await Swal.fire("Success", "Contact request sent successfully", "success");
    } catch (error) {
      await Swal.fire("Error", "An error occurred while sending contact request", "error");
    }
  }
}