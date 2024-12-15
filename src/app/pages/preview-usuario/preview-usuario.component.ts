import { Component, inject, Output } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TeachersService } from "../../services/teachers.service";
import { StudentsService } from "../../services/students.service";
import Swal from "sweetalert2";
import { IAdminInfoResponseInterface } from "../../interfaces/iAdminInfoResponse.interface";
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";
import { IStudentInfoInterface } from "../../interfaces/iStudentInfo.interface";
import { NgClass, NgIf, NgForOf } from "@angular/common";
import { CommonModule } from '@angular/common';
import { StudentCardComponent } from "../../components/student-card/student-card.component";
import { TeacherCardComponent } from "../../components/teacher-card/teacher-card.component";

@Component({
  selector: 'preview-usuario',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    RouterLink,
    CommonModule,
    StudentCardComponent,
    TeacherCardComponent
  ],
  templateUrl: './preview-usuario.component.html',
  styleUrls: ['./preview-usuario.component.css'],
})
export class PreviewUsuarioComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private teachersService = inject(TeachersService);
  private studentsService = inject(StudentsService);

  // Variable que controla la opción seleccionada en el menú
  menuOptionSelected: string = "info";

  // Variables para almacenar los datos de los diferentes tipos de usuario
  teachers: ITeacherInfoInterface[] = [];
  students: IStudentInfoInterface[] = [];
  userToPreviewId: number = 0;

  // Datos de usuario de acuerdo con el rol
  adminData?: IAdminInfoResponseInterface;
  teacherData?: ITeacherInfoInterface;
  studentData?: IStudentInfoInterface;
  activatedRoute = inject(ActivatedRoute);
  userRole: number = 0;
  user_id: number = 0;

  async ngOnInit(): Promise<void> {
    // Llamada al método para cargar los datos del usuario
    this.activatedRoute.params.subscribe(params => {
      this.userToPreviewId = params['id'];
    });

    await this.loadUserData();
  }

  private async loadUserData(): Promise<void> {
    try {
      // Obtiene el rol y el ID del usuario desde el AuthService
      const token = this.authService.getRole();  // Asegúrate de que este método existe y es el correcto
      // this.userRole = token?.role ?? 0; // Usamos el valor por defecto 0 si no hay rol
      this.userRole = 1;
      const userId = this.user_id;

      // Según el rol del usuario, se cargan los datos correspondientes
      switch (this.userRole) {
        case 1:
          // Si es admin, carga los datos del administrador
          await this.loadAdminData(this.userToPreviewId);
          break;
        case 2:
          // Si es profesor, carga los datos del profesor
          await this.loadTeacherData(this.userToPreviewId);
          break;
        case 3:
          // Si es estudiante, carga los datos del estudiante
          await this.loadStudentData(this.userToPreviewId);
          break;
        default:
          // Si el rol no es válido, muestra un error
          Swal.fire('Error', 'Rol de usuario no reconocido', 'error');
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      Swal.fire('Error', 'No se pudo cargar la información del usuario', 'error');
    }
  }

  // Carga los datos del administrador
  private async loadAdminData(id: number): Promise<void> {
    try {
      // Obtiene los datos del administrador y los profesores/estudiantes
      this.adminData = await this.userService.getAdminInfo(id);
      const teachersResponse = await this.teachersService.getNonActiveTeachers(1, 8);
      this.teachers = teachersResponse.data;

      const studentsResponse = await this.studentsService.getAll(1, 8);
      this.students = studentsResponse.data;
    } catch (error) {
      console.error("Error al obtener datos del administrador:", error);
      Swal.fire('Error', 'No se pudo obtener los datos del administrador', 'error');
    }
  }

  // Carga los datos del profesor
  private async loadTeacherData(id: number): Promise<void> {
    try {
      this.teacherData = await this.userService.getTeacherInfo(id);
    } catch (error) {
      console.error("Error al obtener datos del profesor:", error);
      Swal.fire('Error', 'No se pudo obtener los datos del profesor', 'error');
    }
  }

  // Carga los datos del estudiante
  private async loadStudentData(id: number): Promise<void> {
    try {
      this.studentData = await this.userService.getStudentInfo(id);
    } catch (error) {
      console.error("Error al obtener datos del estudiante:", error);
      Swal.fire('Error', 'No se pudo obtener los datos del estudiante', 'error');
    }
  }

  // Métodos para verificar el tipo de usuario (Admin, Teacher, Student)
  isAdmin(): boolean {
    return this.userRole === 1;
  }

  isTeacher(): boolean {
    return this.userRole === 2;
  }

  isStudent(): boolean {
    return this.userRole === 3;
  }

  // Método para cambiar la opción seleccionada en el menú
  setMenuOption(option: string): void {
    this.menuOptionSelected = option;
  }

  // Método para obtener las ramas de conocimiento de un profesor
  getKnowledgeBranches(): string[] {
    return this.teacherData?.knowledge_branches.map(branch => branch.name) || [];
  }
}
