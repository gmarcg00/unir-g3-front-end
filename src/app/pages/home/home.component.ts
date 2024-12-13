import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { RouterLink } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';
import { ITeacherInfoInterface } from '../../interfaces/iTeacherInfoInterface';
import Swal from 'sweetalert2';
import { TeacherCardComponent } from '../../components/teacher-card/teacher-card.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    RouterLink,
    TeacherCardComponent,
    FormsModule  // Asegúrate de incluir FormsModule aquí
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  router = inject(Router);
  teachersService = inject(TeachersService);
  authService = inject(AuthService);

  teachers: ITeacherInfoInterface[] = [];
  city: string = '';  // Definir la propiedad 'city'
  distance: number = 3;
  isLoading: boolean = true;

  /**
   * Component initialization
   */
  async ngOnInit() {
    this.fetchBestAverageRatingTeachers();
  }

  /**
   * Loads the best rated teachers from the service
   */
  fetchBestAverageRatingTeachers(): void {
    this.teachersService.getBestAverageRatingTeachers(1, 4)
      .then(response => this.teachers = response.data)
      .catch(() => Swal.fire('Error', 'Se ha producido un error al obtener los profesores.', 'error'))
      .finally(() => this.isLoading = false);
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

  /**
   * Function to search teachers by city
   */
  searchByCity(): void {
    if (this.city.trim()) {
      this.isLoading = true;
      this.teachersService.getTeachersByCity(this.city, this.distance)
        .then((response: { data: ITeacherInfoInterface[] }) => {
          this.teachers = response.data;
        })
        .catch(() => Swal.fire('Error', 'Se ha producido un error al buscar los profesores por ciudad.', 'error'))
        .finally(() => this.isLoading = false);
    } else {
      Swal.fire('Error', 'Introduzca una ciudad.', 'error');
    }
  }
}

