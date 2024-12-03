import {Component, inject} from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import {TeacherCardComponent} from "../../components/teacher-card/teacher-card.component";
import {TeachersService} from "../../services/teachers.service";
import Swal from "sweetalert2";
import {NgForOf, NgIf} from "@angular/common";
import {IData} from "../../interfaces/iData.interface";
import {ITeacherInfoInterface} from "../../interfaces/iTeacherInfoInterface";
import {IListResponseInterface} from "../../interfaces/iListResponse.interface";

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [TeacherCardComponent, NgForOf, NgIf],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

  teachersService = inject(TeachersService);
  teachers: ITeacherInfoInterface[] = [];
  knowledgeBranches: IData[] = [];
  priceRange: number[] = Array.from({ length: 12 - 5 + 1 }, (_, index) => index + 5);
  averageRange: number[] = Array.from({ length: 5 - 1 + 1 }, (_, index) => index + 1);


  selectedBranches: number[] = [];
  selectedPrices: number[] = [];
  selectedAverages: number[] = [];

  isBranchesDropdownOpen: boolean = false;
  isPriceDropdownOpen: boolean = false;
  isAverageDropdownOpen: boolean = false;

  toggleBranchesDropdown(): void {
    this.isBranchesDropdownOpen = !this.isBranchesDropdownOpen;
  }

  togglePriceDropdown(): void {
    this.isPriceDropdownOpen = !this.isPriceDropdownOpen;
  }

  toggleAverageDropdown(): void {
    this.isAverageDropdownOpen = !this.isAverageDropdownOpen;
  }


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
    const response: IListResponseInterface = await this.teachersService.getTeachers(this.currentPage,this.pageSize,this.selectedBranches,this.selectedPrices,this.selectedAverages);
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
    this.getTeachers().then(() => {
      this.updatePages()
    });
  }

  onSubjectChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if(checkbox.checked) {
      this.selectedBranches.push(Number(value));
    } else {
      this.selectedBranches = this.selectedBranches.filter((option) => option !== Number(value));
    }
    this.currentPage = 1;
    this.getTeachers().then(() => {
      this.updatePages()
    });
  }

  onPriceChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if(checkbox.checked) {
      this.selectedPrices.push(Number(value));
    } else {
      this.selectedPrices = this.selectedPrices.filter((option) => option !== Number(value));
    }
    this.currentPage = 1;
    this.getTeachers().then(() => {
      this.updatePages()
    });
  }

  onAverageChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if(checkbox.checked) {
      this.selectedAverages.push(Number(value));
    } else {
      this.selectedAverages = this.selectedAverages.filter((option) => option !== Number(value));
    }
    this.currentPage = 1;
    this.getTeachers().then(() => {
      this.updatePages()
    });
  }



}
