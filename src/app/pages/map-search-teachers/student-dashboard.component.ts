import { Component, inject } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { ITeacherInfoInterface } from '../../interfaces/iTeacherInfoInterface';
import Swal from 'sweetalert2';
import { MapComponent } from "../../components/map/map.component";


@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [MapComponent, TeachersComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {

  teachersService = inject(TeachersService);
  teachers: ITeacherInfoInterface[] = [];
  distance: number = 3;

  async ngOnInit() {
    this.teachersService.getBestAverageRatingTeachers(1, 4)
      .then(response => this.teachers = response.data)
      .catch(() => Swal.fire("Error", "An error occurred while fetching the data", "error"));

  }

  selectDistance(distance: number) {
    this.distance = distance;
    console.log(this.distance);
  }
} import { TeachersComponent } from '../teachers/teachers.component';

