import { Component, inject } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { IStudentInfoInterface } from '../../interfaces/iStudentInfo.interface';
import { AuthService } from '../../services/auth.service';
import { TeachersService } from '../../services/teachers.service';
import { ITeacherInfoInterface } from '../../interfaces/iTeacherInfoInterface';
import { IListResponseInterface } from '../../interfaces/iListResponse.interface';
import { StudentsComponent } from '../students/students.component';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  imports: [StudentsComponent],
  templateUrl: './home-teacher.component.html',
  styleUrl: './home-teacher.component.css'
})
export class HomeTeacherComponent {

  studentsService = inject(StudentsService);
  teachersService = inject(TeachersService);
  students: IStudentInfoInterface[] = [];
  teacher: ITeacherInfoInterface[] = []
  iList: IListResponseInterface = { total: 0, data: [] };
  authService = inject(AuthService);
  teacherId: number = 0;
  activeTeacher: boolean = false;
  role: number = 0;

  ngOnInit(): void {
    this.teacherId = this.authService.getId();
    const resp = this.teachersService.getTeacherInfo(this.teacherId);
    resp.then((data) => {
      this.activeTeacher = data.active;
      this.role = data.role;
    })
  };
}



