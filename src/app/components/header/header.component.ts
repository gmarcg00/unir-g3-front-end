import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";
import Swal from "sweetalert2";
import { Subscription, filter, take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private routerSubscription?: Subscription;

  actualRole: number = 0;
  isMenuActive: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      take(1) // Only take first navigation event
    ).subscribe(() => {
      this.refreshHeader();
    });
    this.refreshHeader();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  refreshHeader(): void {
    try {
      this.actualRole = this.authService.getRole();
    } catch (error) {
      console.error('Error getting user role:', error);
      this.actualRole = 0;
      this.handleError('Error obteniendo rol de usuario');
    }
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  async signOut(): Promise<void> {
    try {
      this.isLoading = true;
      await this.authService.signOut();
      await Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión correctamente'
      });
      await this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error during sign out:', error);
      await this.handleError('Ha ocurrido un error al cerrar sesión');
    } finally {
      this.isLoading = false;
    }
  }

  private async handleError(message: string): Promise<void> {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }
}
}