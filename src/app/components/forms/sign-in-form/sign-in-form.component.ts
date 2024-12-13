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

      // Personaliza el estilo del SweetAlert
      await Swal.fire({
        title: "Éxito",
        text: "Ha iniciado sesión correctamente.",
        icon: "success",
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'swal-popup',
          confirmButton: 'swal-confirm-button'
        },
        didOpen: () => {
          const popup = document.querySelector('.swal-popup');
          const button = document.querySelector('.swal-confirm-button');

          // Aplicar estilos dinámicamente
          if (popup) {
            popup.setAttribute('style', 'font-family: "Open Sans", sans-serif; background-color: #FFFFFF !important;');
          }
          if (button) {
            button.setAttribute('style', 'background-color: #D4A017 !important; color: white; border: none;');
          }
        }
      });

      await this.router.navigateByUrl("/dashboard");
      console.log(response);
    } catch (error: any) {
      if (error.status === 401) {
        Swal.fire({
          title: "Error",
          text: "Correo electrónico o contraseña no válidos",
          icon: "error",
          customClass: {
            popup: 'swal-popup',
            confirmButton: 'swal-confirm-button'
          },
          didOpen: () => {
            const popup = document.querySelector('.swal-popup');
            const button = document.querySelector('.swal-confirm-button');

            // Aplicar estilos dinámicamente
            if (popup) {
              popup.setAttribute('style', 'font-family: "Open Sans", sans-serif; background-color: #FFFFFF !important;');
            }
            if (button) {
              button.setAttribute('style', 'background-color: #D4A017 !important; color: white; border: none;');
            }
          }
        });
      }
    }

    console.log(this.modelForm.value);
    this.modelForm.reset();
  }
}

