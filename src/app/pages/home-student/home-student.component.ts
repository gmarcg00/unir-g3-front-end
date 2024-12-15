
import {Component, inject} from '@angular/core';
import {MapComponent} from "../../components/map/map.component";
import {NgForOf, NgIf} from "@angular/common";
import {TeacherCardComponent} from "../../components/teacher-card/teacher-card.component";
import {Router, RouterLink} from "@angular/router";
import {TeachersService} from "../../services/teachers.service";
import {AuthService} from "../../services/auth.service";
import {ITeacherInfoInterface} from "../../interfaces/iTeacherInfoInterface";
import Swal from "sweetalert2";
import {StudentsService} from "../../services/students.service";


@Component({
  selector: 'app-home-student',
  standalone: true,
  imports: [
    MapComponent,
    NgForOf,
    NgIf,
    TeacherCardComponent,
    RouterLink
  ],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.css'
})
export class HomeStudentComponent {


  router = inject(Router);
  teachersService = inject(TeachersService);
  studentsService = inject(StudentsService);
  authService = inject(AuthService);

  teachers: ITeacherInfoInterface[] = [];
  myTeachers: ITeacherInfoInterface[] = [];
  distance: number = 3;
  isLoading: boolean = true;

  ngOnInit() {
    this.getMyTeachers();
    this.getTeachers();
  }

  getMyTeachers(): void {
    const studentId = this.authService.getId();
    this.studentsService.getStudentTeachers(studentId,1,4)
        .then(response => this.myTeachers = response.data)
        .catch( () => Swal.fire('Error', 'An error occurred while fetching the teachers.', 'error'))
  }

  getTeachers(): void {
    this.teachersService.getTeachers(1, 4, [], [], [], -1, -1, -1)
      .then(response => this.teachers = response.data)
      .catch( () => Swal.fire('Error', 'An error occurred while fetching the teachers.', 'error'))
      .finally(() => this.isLoading = false);
  }


  /**
   * Updates the search distance for nearby teachers
   * @param distance - Distance in kilometers
   */
  selectDistance(distance: number): void {
    this.distance = distance;
  }

}
