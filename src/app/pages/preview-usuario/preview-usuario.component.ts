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
import {MapComponent} from "../../components/map/map.component";

@Component({
  selector: 'preview-usuario',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    MapComponent,
  ],
  templateUrl: './preview-usuario.component.html',
  styleUrls: ['./preview-usuario.component.css'],
})
export class PreviewUsuarioComponent {
  private userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

  menuOptionSelected: string = "info";
  userId: number = 0;
  teacherData: ITeacherInfoInterface | undefined;
  teachers: ITeacherInfoInterface[] = [];

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(params => {
      this.userId= params['id'];
    });
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getTeacherInfo(this.userId)
        .then((data) => {
          this.teacherData = data;
          this.teachers.push(this.teacherData);
        } )
        .catch((error) => Swal.fire('Error', 'No se pudo cargar la información del usuario', 'error'));
  }

  // Método para cambiar la opción seleccionada en el menú
  setMenuOption(option: string): void {
    this.menuOptionSelected = option;
  }


  getKnowledgeBranches(): string[] {
    if (this.teacherData) {
      return this.teacherData.knowledge_branches.map(branch => branch.name);
    }
    return [];
  }

  getPosition(lat: number | undefined, lng: number | undefined): google.maps.LatLng | null {
    if (lat === undefined || lng === undefined) {
      return null;
    }
    return new google.maps.LatLng(lat, lng);
  }
}
