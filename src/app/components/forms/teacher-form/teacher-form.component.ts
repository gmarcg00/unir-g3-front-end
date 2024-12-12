import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { NgForOf } from "@angular/common";
import { IData } from "../../../interfaces/iData.interface";
import { TeachersService } from "../../../services/teachers.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, NgForOf],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent {
  modelForm: FormGroup;
  authService = inject(AuthService);
  teacherService = inject(TeachersService);
  router = inject(Router);
  latitude: number = -1;
  longitude: number = -1;
  selectedImageBase64: string = "";
  selectedOptions: number[] = [];
  knowledgeBranches: IData[] = [];

  constructor() {
    this.modelForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastNames: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      avatar: new FormControl(null, [
        Validators.required
      ]),
      about: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
    }, [this.checkPassword])
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    })
    this.teacherService.getKnowledgeBranches().then((response) => {
      this.knowledgeBranches = response.data;
    })
  }

  async signUp() {
    const { name, lastNames, phone, about, username, email, password } = this.modelForm.value;
    try {
      const response = await this.authService.teacherSignUp(name, lastNames, phone, this.selectedImageBase64, this.selectedOptions, about, 10, username, email, password, this.latitude, this.longitude);
      localStorage.setItem("token", response.token);
      await Swal.fire({
        title: "Bienvenido",
        text: "Te has registrado correctamente",
        icon: "success",
        background: "#202020",
        color: "#fff",
        showConfirmButton: false,
        timer: 1500
      })

      await this.router.navigateByUrl("/dashboard");
    } catch (error: any) {
      if (error.status === 409) {
        const code = error.error?.code;
        if (code === "CONFLICT")
          await Swal.fire({
            title: "Error",
            text: "El correo o el usuario ya está en uso",
            icon: "error",
            background: "#740001",
            color: "#D4A017"
          })
      }
    }
  }

  checkControl(formControlName: string, validador: string) {
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

  checkPassword(formValue: AbstractControl): any {
    const password = formValue.get('password')?.value;
    const confirmPassword = formValue.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { 'checkPassword': true }
    } else {
      return null
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubjectChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if (checkbox.checked) {
      this.selectedOptions.push(Number(value));
    } else {
      this.selectedOptions = this.selectedOptions.filter((option) => option !== Number(value));
    }
  }
}
