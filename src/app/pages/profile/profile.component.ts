import {Component, inject, Output} from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {IAdminInfoResponseInterface} from "../../interfaces/iAdminInfoResponse.interface";
import {ITeacherInfoResponseInterface} from "../../interfaces/iTeacherInfoResponse.interface";
import {IStudentInfoResponseInterface} from "../../interfaces/iStudentInfoResponse.interface";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfilePreviewComponent, NgClass, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router)
  menuOptionSelected = "info";
  userRole: number = 0;
  @Output() userData: IAdminInfoResponseInterface | ITeacherInfoResponseInterface | IStudentInfoResponseInterface | null = null;

  async ngOnInit(){
    const token = this.authService.getToken();
    if(!token){
      Swal.fire("Error", "You must be logged in to access this page.", "error");
      this.router.navigateByUrl("/home");
    }
    this.setUserRole(token?.role || 0)
    this.userData = await this.getData(token?.id || 0);
    console.log(this.userData)
  }

  getData(id:number): Promise<IAdminInfoResponseInterface | ITeacherInfoResponseInterface | IStudentInfoResponseInterface> {
    switch (this.userRole) {
      case 1:
        return this.userService.getAdminInfo(id);
      case 2:
        return this.userService.getTeacherInfo(id);
      case 3:
        return this.userService.getStudentInfo(id);
      default:
        return Promise.reject(new Error("Invalid user role"));
    }
  }

  setMenuOption(option: string): void {
    this.menuOptionSelected = option;
  }

  setUserRole(role: number): void {
    this.userRole = role;
  }

  async signOut(): Promise<void> {
    this.authService.signOut();
    await Swal.fire("Success", "You have successfully signed out.", "success");
    await this.router.navigateByUrl("/home");
  }

}
