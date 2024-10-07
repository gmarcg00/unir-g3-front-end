import { Component } from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfilePreviewComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
