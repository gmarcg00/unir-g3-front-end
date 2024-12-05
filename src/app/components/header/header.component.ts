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
  styleUrls: ['./header.component.css'] // Corregido aquí
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

  refreshHeader() {
    // Lógica para refrescar el header, por ejemplo, obtener el rol actual del usuario
    this.actualRole = this.authService.getRole();
  }

  signOut() {
    // Lógica para cerrar sesión
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}