import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);
  actualRole: number = -1;
  router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshHeader();
      }
    });
  }

  refreshHeader(): void {
    this.actualRole = this.authService.getRole();
  }

  async signOut(): Promise<void> {
    this.authService.signOut();
    this.actualRole = -1;
    await Swal.fire("Success", "You have successfully signed out.", "success");
    await this.router.navigateByUrl("/home");
  }
}
