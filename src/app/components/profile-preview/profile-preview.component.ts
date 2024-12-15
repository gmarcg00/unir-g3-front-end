import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { NgIf, NgFor } from "@angular/common";
import { StudentCardComponent } from "../../components/student-card/student-card.component";
import { TeacherCardComponent } from "../../components/teacher-card/teacher-card.component";

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css'],
  standalone: true,
  imports: [ NgIf, NgFor, RouterLink, StudentCardComponent, TeacherCardComponent]
})
export class ProfilePreviewComponent {
  // Definir las propiedades
  adminData: any;
  teacherData: any;
  studentData: any;

  // Propiedades adicionales
  isAdminFlag: boolean = false;
  isTeacherFlag: boolean = false;
  isStudentFlag: boolean = false;
  menuOptionSelected: string = 'info'; // Ejemplo de valor, cámbialo según sea necesario
  teachers: any[] = []; // Suponiendo que es un array de objetos con información de profesores

  // Métodos para comprobar los roles
  isAdmin() {
    return this.isAdminFlag;
  }

  isTeacher() {
    return this.isTeacherFlag;
  }

  isStudent() {
    return this.isStudentFlag;
  }
}
