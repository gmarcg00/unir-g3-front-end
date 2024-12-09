import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-home-student',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.css'
})
export class HomeStudentComponent {

}
