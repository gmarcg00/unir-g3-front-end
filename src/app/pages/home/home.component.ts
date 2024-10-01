import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MapComponent,ProfilePreviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
