import {Component, inject} from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { RouterLink } from '@angular/router';
import {TeachersService} from "../../services/teachers.service";
import {ITeacherInfoInterface} from "../../interfaces/iTeacherInfoInterface";
import Swal from 'sweetalert2';
import {TeacherCardComponent} from "../../components/teacher-card/teacher-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MapComponent, RouterLink, TeacherCardComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  teachersService = inject(TeachersService);
  teachers: ITeacherInfoInterface[] = [];
  distance: number = 3;

  async ngOnInit(){
    this.teachersService.getBestAverageRatingTeachers(1,4)
      .then(response => this.teachers = response.data)
      .catch(() => Swal.fire("Error","An error occurred while fetching the data","error"));

  }

  selectDistance(distance: number){
    this.distance = distance;
    console.log(this.distance);
  }


}
