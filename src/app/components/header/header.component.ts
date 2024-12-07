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
<<<<<<< HEAD
  styleUrls: ['./header.component.css']
=======
  styleUrls: ['./header.component.css'] // Corregido aquí
>>>>>>> 4f54dca5f0907e175b3526f0471b3e1ba7654e0b
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
<<<<<<< HEAD
=======
    // Lógica para refrescar el header, por ejemplo, obtener el rol actual del usuario
>>>>>>> 4f54dca5f0907e175b3526f0471b3e1ba7654e0b
    this.actualRole = this.authService.getRole();
  }

  signOut() {
<<<<<<< HEAD
    this.authService.signOut();
=======
    // Lógica para cerrar sesión
    this.authService.logout();
>>>>>>> 4f54dca5f0907e175b3526f0471b3e1ba7654e0b
    this.router.navigate(['/login']);
  }
}