import {Component, inject} from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import {TeacherCardComponent} from "../../components/teacher-card/teacher-card.component";
import {TeachersService} from "../../services/teachers.service";
import Swal from "sweetalert2";
import {NgForOf} from "@angular/common";
import {IData} from "../../interfaces/iData.interface";
import {ITeacherInfoInterface} from "../../interfaces/iTeacherInfoInterface";
import {IListResponseInterface} from "../../interfaces/iListResponse.interface";

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [ProfilePreviewComponent, TeacherCardComponent, NgForOf],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

  teachersService = inject(TeachersService);
  teachers: ITeacherInfoInterface[] = [];
  knowledgeBranches: IData[] = [];

  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(){
    this.getKnowledgeBranches();
    this.getTeachers().then(() => {
      this.updatePages()
    });
  }

  async getKnowledgeBranches(){
    this.teachersService.getKnowledgeBranches()
      .then(response => this.knowledgeBranches = response.data)
      .catch(() => Swal.fire("Error","An error occurred while fetching the data","error"));
  }

  async getTeachers() : Promise<void> {
    const response: IListResponseInterface = await this.teachersService.getTeachers(1,12);
    this.teachers = response.data;
    this.totalPages = Math.ceil(response.total / this.pageSize);
  }

  updatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.getTeachers();
  }



}
