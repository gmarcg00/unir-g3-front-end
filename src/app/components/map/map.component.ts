import { Component, inject } from '@angular/core';
import { ICountry } from '../../interfaces/icountry.interfaces';
import { CountriesService } from '../../services/countries.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMap,MapMarker,MapInfoWindow],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent {
  
  position: any = ""
  countries: ICountry[] = [];
  countriesService = inject(CountriesService);


  ngOnInit(){
    navigator.geolocation.getCurrentPosition((position)=>{
      let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.position = center;
    })

    this.countriesService.findAll()
    .then((countries) => {
      this.countries = countries;
      console.log(this.countries);
    })
  }

  getPosition(latlng: any){
    return new google.maps.LatLng(latlng[0], latlng[1]);
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }
}
