import { Component } from '@angular/core';
import { TeacherFormComponent } from '../../components/forms/teacher-form/teacher-form.component';
import { StudentFormComponent } from '../../components/forms/student-form/student-form.component';
import { CommonModule } from '@angular/common';
import { SignInFormComponent } from '../../components/forms/sign-in-form/sign-in-form.component';

const STUDENT = 'STUDENT';
const TEACHER = 'TEACHER';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TeacherFormComponent,StudentFormComponent,CommonModule,SignInFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
  selectedForm: string = STUDENT;

  selectOption(option: string){
    this.selectedForm = option;
  }

  isStudentSelected(): boolean{
    return this.selectedForm === STUDENT;
  }

  isTeacherSelected(): boolean{
    return this.selectedForm === TEACHER;
  }
}
