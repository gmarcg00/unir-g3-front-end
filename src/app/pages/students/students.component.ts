import { Component, inject, Input } from '@angular/core';
import { StudentsService } from "../../services/students.service";
import { IStudentInfoInterface } from "../../interfaces/iStudentInfo.interface";
import { IListResponseInterface } from "../../interfaces/iListResponse.interface";
import { NgForOf } from "@angular/common";
import { StudentCardComponent } from "../../components/student-card/student-card.component";
import { TeachersService } from '../../services/teachers.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    NgForOf,
    StudentCardComponent
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  studentsService = inject(StudentsService);
  teachersService = inject(TeachersService);
  authService = inject(AuthService);
  students: IStudentInfoInterface[] = [];
  @Input() teacherId: number = 0;
  @Input() role: number = 1;

  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.role = this.authService.getRole();
    this.getData().then(() => {
      this.updatePages()
    });
  }

  updatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.getData();
  }

  async getData(): Promise<void> {
    let response: IListResponseInterface;
    if (this.role !== 2) {
      response = await this.studentsService.getAll(this.currentPage, this.pageSize)
    } else {
      response = await this.teachersService.getStudentsByTeacher(this.teacherId);
    }

    this.students = response.data;
    this.totalPages = Math.ceil(response.total / this.pageSize);
  }

}
