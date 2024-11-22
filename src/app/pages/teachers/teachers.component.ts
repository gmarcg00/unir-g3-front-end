import { Component } from '@angular/core';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import {TeacherCardComponent} from "../../components/teacher-card/teacher-card.component";

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [ProfilePreviewComponent, TeacherCardComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

}
