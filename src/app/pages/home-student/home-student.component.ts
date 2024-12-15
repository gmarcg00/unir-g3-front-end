import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-student',
  standalone: true,
  imports: [],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.css'
})
export class HomeStudentComponent {
  router = inject(Router);

  // AQUI ES COMO HACER UN REVIEW DE UN PROFE
  navigateSnape() {
    this.router.navigate(['/review'], { state: { teacherId: 26, studentId: 2 } });
  }

}
