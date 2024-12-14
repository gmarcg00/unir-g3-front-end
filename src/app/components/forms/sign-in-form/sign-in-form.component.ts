import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";

import Swal from 'sweetalert2';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent {
  modelForm: FormGroup;
  router = inject(Router);
  authService = inject(AuthService);

  constructor() {
    this.modelForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(null, [
        Validators.minLength(3)
      ])
    });
  }

  async signIn() {
    const { email, password } = this.modelForm.value;
    try {
      const response = await this.authService.signIn(email, password);
      localStorage.setItem("token", response.token);
      await Swal.fire({
        title: "Bienvenido",
        text: "al hogar de la mágia",
        icon: "success",
        background: "#202020",
        color: "#fff",
        showConfirmButton: false,
        timer: 1500
      })
      await this.router.navigateByUrl("/dashboard");
      console.log(response);
    } catch (error: any) {
      if (error.status === 401) {
        Swal.fire({
          title: "Error",
          text: "Email o password incorrectos",
          icon: "error",
          background: "#740001",
          color: "#D4A017"
        });
      }
    }
    this.modelForm.reset();
  }
}

