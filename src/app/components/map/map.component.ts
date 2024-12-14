import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ICountry } from '../../interfaces/icountry.interfaces';
import { CountriesService } from '../../services/countries.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ITeacherInfoInterface } from "../../interfaces/iTeacherInfoInterface";
import { TeachersService } from "../../services/teachers.service";
import { IListResponseInterface } from "../../interfaces/iListResponse.interface";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, MapInfoWindow, RouterLink],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent {

  position: any = "";
  latitude: number = 0;
  longitude: number = 0;
  @Input() range: number = 3;
  teachers: ITeacherInfoInterface[] = [];
  teachersService = inject(TeachersService);

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.getTeachers();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['range']) {
      this.getTeachers();
    }
  }

  getPosition(lat: number, lng: number) {
    return new google.maps.LatLng(lat, lng);
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  async getTeachers(): Promise<void> {
    const response: IListResponseInterface = await this.teachersService.getTeachers(1, 40, [], [], [], this.latitude, this.longitude, this.range);
    this.teachers = response.data;
  }
}
