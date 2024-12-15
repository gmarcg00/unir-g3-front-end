import { Component, inject, Output } from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { NgForOf } from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import { NgClass, NgIf } from "@angular/common";
import { UserService } from "../../services/user.service";
import { TeachersService } from "../../services/teachers.service";
import { StudentsService } from "../../services/students.service";
import { IAdminInfoResponseInterface } from "../../interfaces/iAdminInfoResponse.interface";
import { IListResponseInterface } from "../../interfaces/iListResponse.interface";
import { IStudentInfoInterface } from "../../interfaces/iStudentInfo.interface";
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";
import { StudentCardComponent } from "../../components/student-card/student-card.component";
import { TeacherCardComponent } from "../../components/teacher-card/teacher-card.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass, NgIf,
    StudentCardComponent, TeacherCardComponent, NgForOf, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router)
  menuOptionSelected = "info";
  userRole: number = 0;
  @Output() adminData: IAdminInfoResponseInterface | undefined;
  @Output() teacherData: ITeacherInfoInterface | undefined;
  @Output() studentData: IStudentInfoInterface | undefined;
   teachersService = inject(TeachersService);
    studentsService = inject(StudentsService);
    teachers: ITeacherInfoInterface[] = [];
    students: IStudentInfoInterface[] = [];


  getTeachers(): void {
      this.teachersService.getNonActiveTeachers(1, 8)
        .then(response => this.teachers = response.data)
        .catch(() => Swal.fire({
          title: 'Ha ocurrido un error',
          text: 'mientras se cargaban los profesores',
          icon: 'error',
            background: "#202020",
            color: "#fff",
        })
        );
    }

    getStudents(): void {
        this.studentsService.getAll(1, 8)
          .then(response => this.students = response.data)
          .catch(() => Swal.fire({
            title: 'Ha ocurrido un error',
            text: 'mientras se cargaban los estudiantes',
            icon: 'error',
              background: "#202020",
              color: "#fff",
          })
          );
      }

  async ngOnInit() {
    const token = this.authService.getTokenPayload();
    if (!token) {
      Swal.fire({
        title: 'Error !!',
        text: 'Debes entrar en tu cuenta para ver esta página',
        icon: 'error',
        background: "#202020",
        color: "#fff",
      })
      this.router.navigateByUrl("/home");
    }
    this.setUserRole(token?.role || 0)
    await this.getData(token?.id || 0);
  }

  async getData(id: number): Promise<void> {
    switch (this.userRole) {
      case 1:
        this.adminData = await this.userService.getAdminInfo(id);
        break;
      case 2:
        this.teacherData = await this.userService.getTeacherInfo(id);
        break;
      case 3:
        this.studentData = await this.userService.getStudentInfo(id);
        break;
      default:
        break;
    }
  }

  getKnowledgeBranches(): string[] {
    if (this.teacherData) {
      return this.teacherData.knowledge_branches.map(branch => branch.name);
    }
    return [];
  }

  setMenuOption(option: string): void {
    this.menuOptionSelected = option;
  }

  setUserRole(role: number): void {
    this.userRole = role;
  }

  isAdmin(): boolean {
    return this.userRole === 1;
  }

  isTeacher(): boolean {
    return this.userRole === 2;
  }

  isStudent(): boolean {
    return this.userRole === 3;
  }

  async signOut(): Promise<void> {
    this.authService.signOut();
    await Swal.fire({
      title: 'Hasta la proxima !!',
      text: 'Saliste con exito.',
      icon: 'success',
      background: "#202020",
      color: "#fff",
      showConfirmButton: false,
      timer: 1000
    })
    await this.router.navigateByUrl("/home");
  }

}
