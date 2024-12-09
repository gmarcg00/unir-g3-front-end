import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {

  modelForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router)


  latitude: number = -1;
  longitude: number = -1;
  selectedImageBase64: string = "";

  ngOnInit(){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    })
  }

  constructor(){
    this.modelForm = new FormGroup({
      name: new FormControl(null,[
        Validators.required,
        Validators.minLength(3)
      ]),
      lastNames: new FormControl(null,[
        Validators.required,
        Validators.minLength(3)
      ]),
      phone: new FormControl(null,[
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      username: new FormControl(null,[
        Validators.required,
        Validators.minLength(3)
      ]),
      avatar: new FormControl(null,[
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
    },[this.checkPassword])
  }

  async signUp(){
    const {name,lastNames,phone,username,email,password} = this.modelForm.value;
    try{
      const response  = await this.authService.studentSignUp(name,lastNames,phone,this.selectedImageBase64,username,email,password,this.latitude,this.longitude);
      localStorage.setItem("token", response.token);
      await Swal.fire("Success", "You have successfully signed in.", "success");
      await this.router.navigateByUrl("/dashboard");
    }catch (error: any){
      if(error.status === 409){
        const code = error.error?.code;
        if(code === "CONFLICT") await Swal.fire("Error", "Email or username already used.", "error");
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

}
