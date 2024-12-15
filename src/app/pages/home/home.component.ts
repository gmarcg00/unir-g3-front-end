import { CommonModule } from '@angular/common';
import {Component, inject, SimpleChanges} from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { TeachersService } from "../../services/teachers.service";
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";
import Swal from 'sweetalert2';
import { TeacherCardComponent } from "../../components/teacher-card/teacher-card.component";
import { AuthService } from "../../services/auth.service";
import {IListResponseInterface} from "../../interfaces/iListResponse.interface";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    RouterLink,
    TeacherCardComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  router = inject(Router);
  teachersService = inject(TeachersService);
  authService = inject(AuthService);

  bestTeachers: ITeacherInfoInterface[] = [];
  mapTeachers: ITeacherInfoInterface[] = [];
  distance: number = 3;
  latitude: number = 0;
  longitude: number = 0;
  position: any = "";

  /**
   * Component initialization
   */
  async ngOnInit() {
    await this.fetchBestAverageRatingTeachers();
    await this.getTeachers();
  }

  /**
   * Loads the best rated teachers from the service
   */
  async fetchBestAverageRatingTeachers(): Promise<void> {
    const response = await this.teachersService.getBestAverageRatingTeachers(1, 4);
    this.bestTeachers = response.data;
  }

  /**
   * Updates the search distance for nearby teachers
   * @param distance - Distance in kilometers
   */
  selectDistance(distance: number): void {
    this.distance = distance;
    this.getTeachers();
  }

  async getTeachers(): Promise<void> {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    })
    const response: IListResponseInterface = await this.teachersService.getTeachers(1, 40, [], [], [], this.latitude, this.longitude, this.distance);
    this.mapTeachers = response.data;
  }

  getPosition(lat: number | undefined, lng: number | undefined): google.maps.LatLng | null {
    if (lat === undefined || lng === undefined) {
      return null;
    }
    return new google.maps.LatLng(lat, lng);
  }
}

