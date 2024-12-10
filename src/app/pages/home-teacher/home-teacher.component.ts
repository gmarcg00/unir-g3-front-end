import { Component, inject } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { IStudentInfoInterface } from '../../interfaces/iStudentInfo.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  imports: [],
  templateUrl: './home-teacher.component.html',
  styleUrl: './home-teacher.component.css'
})
export class HomeTeacherComponent {

  studentsService = inject(StudentsService);
  students: IStudentInfoInterface[] = [];
  authService = inject(AuthService);
  teacherId: number = 0;

  ngOnInit(): void {
    // coger el token del localStorage para sacar la id token
    const token = this.authService.getTokenPayload();
    if (typeof token?.id === 'number') { this.teacherId = token.id; }

  }

}

