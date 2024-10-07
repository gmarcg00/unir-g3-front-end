import { Component } from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [ProfilePreviewComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

}
