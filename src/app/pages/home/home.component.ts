import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../components/map/map.component';
import { RouterLink } from '@angular/router';
import { TeachersService } from "../../services/teachers.service";
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";
import Swal from 'sweetalert2';
import { TeacherCardComponent } from "../../components/teacher-card/teacher-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MapComponent, RouterLink, TeacherCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly teachersService = inject(TeachersService);

  teachers: ITeacherInfoInterface[] = [];
  distance: number = 3;
  isLoading: boolean = true;

  async ngOnInit(): Promise<void> {
    await this.loadBestRatedTeachers();
  }

  private async loadBestRatedTeachers(): Promise<void> {
    try {
      this.isLoading = true;
      const response = await this.teachersService.getBestAverageRatingTeachers(1, 4);
      this.teachers = response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching the teachers data",
        icon: "error"
      });
    } finally {
      this.isLoading = false;
    }
  }

  selectDistance(distance: number): void {
    this.distance = distance;
  }

  get formattedDistance(): string {
    return `${this.distance} KM`;
  }
}