import { Component, inject, Input } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { NgIf, DecimalPipe } from "@angular/common";
import { IData } from "../../interfaces/iData.interface";
import { TeachersService } from "../../services/teachers.service";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent {
  readonly ROLE_ADMIN = 1;
  readonly ROLE_STUDENT = 2;

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() lastNames: string = "";
  @Input() knowledgeBranches: IData[] = [];
  @Input() price: number = 0;
  @Input() image: string = "";
  @Input() isValidated: boolean = false;
  @Input() averageRating: number = 0;

  loading = false;
  public authService = inject(AuthService);
  private teachersService = inject(TeachersService);
  private router = inject(Router);

  getKnowledgeBranches(): string[] {
    return this.knowledgeBranches.map(branch => branch.name);
  }

  async contactTeacher(id: number): Promise<void> {
    if (this.loading) return;
    this.loading = true;

    try {
      await this.router.navigate(['/contact', id]);
    } catch (error) {
      this.handleError(error, "Unable to navigate to contact page");
    } finally {
      this.loading = false;
    }
  }

  async activateTeacher(id: number): Promise<void> {
    if (this.loading) return;
    this.loading = true;

    try {
      const token = this.authService.getToken();
      await this.teachersService.activateTeacher(token, id);
      this.isValidated = true;
      Swal.fire({
        title: "Success",
        text: "Teacher activated successfully",
        icon: "success",
        confirmButtonText: 'OK'
      });
    } catch (error) {
      this.handleError(error, "Unable to activate teacher");
    } finally {
      this.loading = false;
    }
  }

  async deactivateTeacher(id: number): Promise<void> {
    if (this.loading) return;
    this.loading = true;

    try {
      const token = this.authService.getToken();
      await this.teachersService.activateTeacher(token, id);
      this.isValidated = false;
      Swal.fire({
        title: "Success",
        text: "Teacher deactivated successfully",
        icon: "success",
        confirmButtonText: 'OK'
      });
    } catch (error) {
      this.handleError(error, "Unable to deactivate teacher");
    } finally {
      this.loading = false;
    }
  }

  private handleError(error: any, message: string): void {
    console.error('Error details:', error);
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: 'OK'
    });
  }
}