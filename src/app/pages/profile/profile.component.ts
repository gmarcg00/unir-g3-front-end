import { Component, inject, Output } from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgClass, NgIf } from "@angular/common";
import { UserService } from "../../services/user.service";
import { IAdminInfoResponseInterface } from "../../interfaces/iAdminInfoResponse.interface";
import { IStudentInfoInterface } from "../../interfaces/iStudentInfo.interface";
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfilePreviewComponent, NgClass, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  http = inject(HttpClient);

  menuOptionSelected = "info";
  userRole: number = 0;
  @Output() adminData: IAdminInfoResponseInterface | undefined;
  @Output() teacherData: ITeacherInfoInterface | undefined;
  @Output() studentData: IStudentInfoInterface | undefined;

  async ngOnInit() {
    const token = this.authService.getTokenPayload();
    if (!token) {
      Swal.fire("Error", "You must be logged in to access this page.", "error");
      this.router.navigateByUrl("/home");
      return;
    }
    this.setUserRole(token?.role || 0);
    await this.getData(token?.id || 0);
  }

  async getData(id: number): Promise<void> {
    switch (this.userRole) {
      case 1:
        this.adminData = await this.userService.getAdminInfo(id);
        break;
      case 2:
        this.teacherData = await this.userService.getTeacherInfo(id);
        break;
      case 3:
        this.studentData = await this.userService.getStudentInfo(id);
        break;
      default:
        break;
    }
  }

  getKnowledgeBranches(): string[] {
    if (this.teacherData) {
      return this.teacherData.knowledge_branches.map(branch => branch.name);
    }
    return [];
  }

  setMenuOption(option: string): void {
    this.menuOptionSelected = option;
  }

  setUserRole(role: number): void {
    this.userRole = role;
  }

  isAdmin(): boolean {
    return this.userRole === 1;
  }

  isTeacher(): boolean {
    return this.userRole === 2;
  }

  isStudent(): boolean {
    return this.userRole === 3;
  }

  async signOut(): Promise<void> {
    this.authService.signOut();
    await Swal.fire("Success", "You have successfully signed out.", "success");
    await this.router.navigateByUrl("/home");
  }

  async editStudentProfile(studentData: IStudentInfoInterface): Promise<void> {
    try {
      const updatedStudentData = await this.http.put<IStudentInfoInterface>(`/api/students/${studentData.id}`, studentData).toPromise();
      if (updatedStudentData) {
        this.studentData = updatedStudentData;
        await Swal.fire("Success", "Student profile updated successfully.", "success");
      }
    } catch (error) {
      await Swal.fire("Error", "Failed to update student profile.", "error");
    }
  }

  async editTeacherProfile(teacherData: ITeacherInfoInterface): Promise<void> {
    try {
      const updatedTeacherData = await this.http.put<ITeacherInfoInterface>(`/api/teachers/${teacherData.id}`, teacherData).toPromise();
      if (updatedTeacherData) {
        this.teacherData = updatedTeacherData;
        await Swal.fire("Success", "Teacher profile updated successfully.", "success");
      }
    } catch (error) {
      await Swal.fire("Error", "Failed to update teacher profile.", "error");
    }
  }
}