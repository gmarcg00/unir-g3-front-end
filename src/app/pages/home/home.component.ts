import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Components
import { MapComponent } from '../../components/map/map.component';
import { TeacherCardComponent } from "../../components/teacher-card/teacher-card.component";

// Services
import { TeachersService } from "../../services/teachers.service";

// Interfaces
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";

// Third party
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    RouterLink,
    TeacherCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly teachersService = inject(TeachersService);

  teachers: ITeacherInfoInterface[] = [];
  distance: number = 3;
  isLoading: boolean = true;

  /**
   * Component initialization
   */
  async ngOnInit(): Promise<void> {
    await this.loadBestRatedTeachers();
  }

  /**
   * Loads the best rated teachers from the service
   * @private
   */
  private async loadBestRatedTeachers(): Promise<void> {
    try {
      this.isLoading = true;
      const response = await this.teachersService.getBestAverageRatingTeachers(1, 4);
      this.teachers = response.data;
    } catch (error: unknown) {
      console.error('Error loading teachers:', error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al cargar los profesores",
        icon: "error"
      });
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Updates the search distance for nearby teachers
   * @param distance - Distance in kilometers
   */
  selectDistance(distance: number): void {
    this.distance = distance;
  }

  /**
   * Returns formatted distance string
   */
  get formattedDistance(): string {
    return `${this.distance} KM`;
  }
}