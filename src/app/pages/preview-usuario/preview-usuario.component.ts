import { Component, inject, Output } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { TeachersService } from "../../services/teachers.service";
import { StudentsService } from "../../services/students.service";
import Swal from "sweetalert2";
import { IAdminInfoResponseInterface } from "../../interfaces/iAdminInfoResponse.interface";
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";
import { IStudentInfoInterface } from "../../interfaces/iStudentInfo.interface";
import { NgClass, NgIf, NgFor } from "@angular/common";

@Component({
  selector: 'preview-usuario',
  standalone: true,
  imports: [NgClass, NgIf, NgFor],
  templateUrl: './preview-usuario.component.html',
  styleUrls: ['./preview-usuario.component.css'],
})
export class ProfileComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  teachersService = inject(TeachersService);
  studentsService = inject(StudentsService);
  
  teachers: ITeacherInfoInterface[] = [];
  students: IStudentInfoInterface[] = [];
  userRole: number = 0;
  
  @Output() adminData: IAdminInfoResponseInterface | undefined;
  @Output() teacherData: ITeacherInfoInterface | undefined;
  @Output() studentData: IStudentInfoInterface | undefined;

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userRole = this.authService.getRole();

    const userId = this.authService.getId(); 
    
    if (this.userRole === 1) {
      this.loadAdminData(userId);
    } else if (this.userRole === 2) {
      this.loadTeacherData(userId);
    } else if (this.userRole === 3) {
      this.loadStudentData(userId);
    }
  }

  loadAdminData(id: number) {
    this.userService.getAdminInfo(id).then(data => {
      this.adminData = data;
    }).catch(error => {
      console.error("Error al obtener datos del admin:", error);
      Swal.fire('Error', 'No se pudo obtener los datos del administrador', 'error');
    });

    this.teachersService.getNonActiveTeachers(1, 8).then(response => this.teachers = response.data)
      .catch(error => {
      console.error("Error al obtener profesores en espera:", error);
    });

    this.studentsService.getAll(1, 8).then(response => 
      this.students = response.data)
      .catch(error => {
      console.error("Error al obtener estudiantes en espera:", error);
    });
  }

  loadTeacherData(id: number) {
    this.userService.getTeacherInfo(id).then(data => {
      this.teacherData = data;
    }).catch(error => {
      console.error("Error al obtener datos del profesor:", error);
      Swal.fire('Error', 'No se pudo obtener los datos del profesor', 'error');
    });
  }

  loadStudentData(id: number) {
    this.userService.getStudentInfo(id).then(data => {
      this.studentData = data;
    }).catch(error => {
      console.error("Error al obtener datos del estudiante:", error);
      Swal.fire('Error', 'No se pudo obtener los datos del estudiante', 'error');
    });
  }

  isAdmin() {
    return this.userRole === 1;
  }

  isTeacher() {
    return this.userRole === 2;
  }

  isStudent() {
    return this.userRole === 3;
  }
}
