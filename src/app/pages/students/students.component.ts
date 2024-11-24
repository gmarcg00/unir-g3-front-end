import {Component, inject} from '@angular/core';
import {StudentsService} from "../../services/students.service";
import {IStudentInfoInterface} from "../../interfaces/iStudentInfo.interface";
import {IListResponseInterface} from "../../interfaces/iListResponse.interface";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  studentsService = inject(StudentsService);
  students: IStudentInfoInterface[] = [];

  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  pages: number[] = [];

  async getData(): Promise<void> {
    const response: IListResponseInterface = await this.studentsService.getAll(this.currentPage,this.pageSize)
    this.students = response.data;
    this.totalPages = Math.ceil(response.total / this.pageSize);
  }

}
