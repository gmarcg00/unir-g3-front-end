import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";
import Swal from "sweetalert2";
import { TeachersService } from '../../services/teachers.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);
  teachersService = inject(TeachersService);
  actualRole: number = -1;
  router = inject(Router);
  activeTeacher: boolean = false;

  // AQUI ES COMO HACER UN REVIEW DE UN PROFE
  navigateSnape() {
    this.router.navigate(['/review'], { state: { teacherId: 26, studentId: 2 } });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshHeader();
      }
    });

  }

  refreshHeader(): void {
    this.actualRole = this.authService.getRole();
    const teacherId = this.authService.getId();
    if (this.actualRole === 2) {
      this.teachersService.getTeacherInfo(teacherId)
        .then((data) => {
          this.activeTeacher = data.active;
        })
    }
  }

  goHome(): void {
    const token = this.authService.getToken();
    if (!token) this.router.navigateByUrl("/home");
    else {
      const role = this.authService.getRole();
      if (role === 1) this.router.navigateByUrl("/dashboard/admin");
      else if (role === 2) this.router.navigateByUrl("/dashboard/teacher");
      else if (role === 3) this.router.navigateByUrl("/dashboard/student");
    }
  }

  async signOut(): Promise<void> {
    this.authService.signOut();
    await Swal.fire({
      title: "Hasta la proxima !!",
      text: "Saliste con exito.",
      icon: "success",
      background: "#202020",
      color: "#fff",
      showConfirmButton: false,
      timer: 1500
    })
    await this.router.navigateByUrl("/home");
    this.refreshHeader();
  }
}

