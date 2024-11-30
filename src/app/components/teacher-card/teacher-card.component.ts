import { Component, inject, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IData } from "../../interfaces/iData.interface";
import { TeachersService } from "../../services/teachers.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './teacher-card.component.html',
  styleUrl: './teacher-card.component.css'
})
export class TeacherCardComponent {
  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() lastNames: string = "";
  @Input() knowledgeBranches: IData[] = [];
  @Input() price: number = 0;
  @Input() image: string = "";

  teachersService = inject(TeachersService);
  authService = inject(AuthService);
  router = inject(Router)

  getKnowledgeBranches(): string[] {
    return this.knowledgeBranches.map(branch => branch.name);
  }

  activateTeacher(id: number): void {
    const token = this.authService.getToken();
    this.teachersService.activateTeacher(token, id)
      .then(async () => {
        await Swal.fire({
          title: 'Success',
          text: 'Teacher activated successfully',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        });
        window.location.reload();
      })
      .catch(async () => {
        await Swal.fire("Error", "An error occurred while activating the teacher", "error");
      });
  }

}
