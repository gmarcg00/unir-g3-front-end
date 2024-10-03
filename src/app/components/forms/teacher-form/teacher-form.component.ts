import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent {
    modelForm:  FormGroup;

    constructor(){
      this.modelForm = new FormGroup({
        name: new FormControl(null, [
          Validators.required
        ]),
        surname: new FormControl(null, [
          Validators.required
        ])
        

      })
    }

    signUp(){

    }
}
