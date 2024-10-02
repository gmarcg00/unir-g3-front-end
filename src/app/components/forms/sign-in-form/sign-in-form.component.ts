import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  modelForm: FormGroup;

  constructor(){
    this.modelForm = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(null,[
        Validators.minLength(8)
      ])
    })
  }

  signIn(){
    console.log(this.modelForm.value);
    this.modelForm.reset();
  }
}
