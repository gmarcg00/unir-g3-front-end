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

  async signOut(): Promise<void> {
    this.authService.signOut();
    await Swal.fire("Success", "You have successfully signed out.", "success");
    await this.router.navigateByUrl("/home");
    this.refreshHeader();
  }
}
