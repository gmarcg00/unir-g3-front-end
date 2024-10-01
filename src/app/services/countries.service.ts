import { inject, Inject, Injectable } from '@angular/core';
import { api_hostname } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../interfaces/icountry.interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CountriesService {
  private hostname: string = api_hostname;
  private http = inject(HttpClient);
  

  findAll(region = "europe") :Promise<ICountry[]> {
    return firstValueFrom(this.http.get<ICountry[]> (`${this.hostname}region/${region}`));
  }

}
