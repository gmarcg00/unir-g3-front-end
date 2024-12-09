import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  authService = inject(AuthService);
  router = inject(Router);

  async ngOnInit() {
    const userRole = this.authService.getRole();
    switch (userRole) {
      case 1:
        this.router.navigate(['dashboard/admin']);
        break;
      case 2:
        this.router.navigate(['dashboard/teacher']);
        break;
      case 3:
        this.router.navigate(['dashboard/student']);
        break;
      default:
        break;
    }
  }

}
