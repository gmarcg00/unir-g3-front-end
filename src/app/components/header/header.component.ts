import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  actualRole: number = 0;
  isMenuActive: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshHeader();
      }
    });
    this.refreshHeader();
  }

  refreshHeader(): void {
    this.actualRole = this.authService.getRole();
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  signOut(): void {
    this.authService.signOut();
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente'
    });
    this.router.navigate(['/home']);
  }
}