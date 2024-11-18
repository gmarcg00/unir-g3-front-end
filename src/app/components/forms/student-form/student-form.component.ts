import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {

  modelForm: FormGroup;

  constructor(){
    this.modelForm = new FormGroup({
      name: new FormControl(null,[
        Validators.required
      ])
    })
  }

  signUp(){
  }

}
