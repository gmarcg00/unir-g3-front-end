import {Component, inject, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {StudentsService} from "../../services/students.service";

@Component({
  selector: 'app-student-card',
  standalone: true,
    imports: [
        NgIf,
        RouterLink
    ],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent {
  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() lastNames: string = "";
  @Input() image: string = "";

  authService = inject(AuthService);
  studentsService = inject(StudentsService);

  deactivateStudent(id: number): void {
    const token = this.authService.getToken();
    this.studentsService.deactivateStudent(token,id)
      .then(async () => {
        await Swal.fire("Success", "Student deactivated successfully", "success");
        window.location.reload();
      })
      .catch(async () => {
        await Swal.fire("Error", "An error occurred while deactivating the student", "error");
      });
  }
}
