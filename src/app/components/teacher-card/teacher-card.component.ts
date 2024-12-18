import { Component, inject, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IData } from "../../interfaces/iData.interface";
import { TeachersService } from "../../services/teachers.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgIf } from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

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
  router = inject(Router);

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() lastNames: string = "";
  @Input() knowledgeBranches: IData[] = [];
  @Input() price: number = 0;
  @Input() image: string = "";
  @Input() isValorable: boolean = false;
  @Input() isContactable: boolean = false;

  teachersService = inject(TeachersService);
  authService = inject(AuthService);

  getKnowledgeBranches(): string[] {
    return this.knowledgeBranches.map(branch => branch.name);
  }

  activateTeacher(id: number): void {
    const token = this.authService.getToken();
    this.teachersService.activateTeacher(token, id)
      .then(async () => {
        await Swal.fire({
          title: 'Activado !!',
          text: 'El profesaro a sido activado con exito',
          icon: 'error',
          background: "#202020",
          color: "#fff"
        })
        window.location.reload();
      })
      .catch(async () => {
        await Swal.fire({
          title: 'Error ha ocurrido ',
          text: 'Mientras activabamos el profesor',
          icon: 'error',
          background: "#740001",
          color: "#D4A017"
        })
      });
  }

  async reviewTeacher(): Promise<void> {
    const token = this.authService.getTokenPayload();
    await this.router.navigate(['/review'], { state: { teacherId: this.id, studentId: token?.id } });
  }

  async contactTeacher(): Promise<void> {
    const token = this.authService.getTokenPayload();
    try {
      await this.teachersService.contact(token?.id, this.id);
    }catch (error){
      if(error instanceof HttpErrorResponse){
        if(error.status === 400){
          await Swal.fire({
            title: 'Ya has contactado a este profesor',
            text: 'Dirigite a la seccion de chats para continuar la conversacion',
            icon: 'info',
            background: "#740001",
            color: "#D4A017"
          })
      }
    }

    }

    await this.router.navigate(['/chats']);
  }



}
