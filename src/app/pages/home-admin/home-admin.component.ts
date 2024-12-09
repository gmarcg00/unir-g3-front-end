import {Component, inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TeacherCardComponent} from "../../components/teacher-card/teacher-card.component";
import {TeachersService} from "../../services/teachers.service";
import {ITeacherInfoInterface} from "../../interfaces/iTeacherInfoInterface";
import {IListResponseInterface} from "../../interfaces/iListResponse.interface";
import Swal from "sweetalert2";
import {RouterLink} from "@angular/router";
import {StudentsService} from "../../services/students.service";
import {IStudentInfoInterface} from "../../interfaces/iStudentInfo.interface";
import {StudentCardComponent} from "../../components/student-card/student-card.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    NgForOf,
    TeacherCardComponent,
    RouterLink,
    StudentCardComponent
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

  teachersService = inject(TeachersService);
  studentsService = inject(StudentsService);
  teachers: ITeacherInfoInterface[] = [];
  students: IStudentInfoInterface[] = [];

  ngOnInit(){
    this.getTeachers();
    this.getStudents();
  }

   getTeachers(): void {
    this.teachersService.getNonActiveTeachers(1,8)
      .then(response => this.teachers = response.data)
      .catch( () => Swal.fire('Error', 'An error occurred while fetching the teachers.', 'error'))
  }

  getStudents(): void{
    this.studentsService.getAll(1,8)
      .then(response => this.students = response.data)
      .catch( () => Swal.fire('Error', 'An error occurred while fetching the students.', 'error'));
  }
}
