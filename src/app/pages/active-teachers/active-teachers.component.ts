import {Component, inject} from '@angular/core';
import {TeacherCardComponent} from "../../components/teacher-card/teacher-card.component";
import {IListResponseInterface} from "../../interfaces/iListResponse.interface";
import {TeachersService} from "../../services/teachers.service";
import {NgForOf} from "@angular/common";
import {ITeacherInfoInterface} from "../../interfaces/iTeacherInfoInterface";

@Component({
  selector: 'app-active-teachers',
  standalone: true,
  imports: [
    TeacherCardComponent,
    NgForOf
  ],
  templateUrl: './active-teachers.component.html',
  styleUrl: './active-teachers.component.css'
})
export class ActiveTeachersComponent {
  teachersService = inject(TeachersService);
  teachers: ITeacherInfoInterface[] = [];

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
    const response: IListResponseInterface = await this.teachersService.getNonActiveTeachers(this.currentPage,this.pageSize)
    this.teachers = response.data;
    this.totalPages = Math.ceil(response.total / this.pageSize);
  }

}
