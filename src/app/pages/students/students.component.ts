import {Component, inject} from '@angular/core';
import {StudentsService} from "../../services/students.service";
import {IStudentInfoInterface} from "../../interfaces/iStudentInfo.interface";
import {IListResponseInterface} from "../../interfaces/iListResponse.interface";
import {NgForOf} from "@angular/common";
import {StudentCardComponent} from "../../components/student-card/student-card.component";

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
  students: IStudentInfoInterface[] = [];

  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(){
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
    const response: IListResponseInterface = await this.studentsService.getAll(this.currentPage,this.pageSize)
    this.students = response.data;
    this.totalPages = Math.ceil(response.total / this.pageSize);
  }

}
