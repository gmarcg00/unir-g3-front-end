import { Component, inject, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { TeachersService } from '../../services/teachers.service';
import { AuthService } from '../../services/auth.service';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-puntua-profe',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './puntua-profe.component.html',
  styleUrl: './puntua-profe.component.css'
})
export class PuntuaProfeComponent {

  /// comporvar que es pasa els parametres
  ///         pagina a app-routes
  /// 1 comprobar que existe el review 
  /// Si existe coger los datos y mostrarlos en el formulario.
  /// 2 si no existe lo creamos.


  teachersService = inject(TeachersService);
  studentsService = inject(StudentsService);
  authService = inject(AuthService);
  reviewsService = inject(ReviewsService);

  teacherId: number = 0;
  studentId: number = 0;
  rating: number = 1;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = this.rating;


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const teacherStrId = navigation?.extras.state?.['teacherId'] || null;
    console.log("recibiendo Teacher ID", teacherStrId);
    this.teacherId = Number(teacherStrId);
    const studentStrId = navigation?.extras.state?.['studentId'] || null;
    console.log("recibiendo student ID", studentStrId);
    this.studentId = Number(studentStrId);
  }

  selectRating(rating: number): void {
    this.selectedRating = rating;
    console.log(this.selectedRating)
  }

  saveReview(reviewForm: any): void {
    console.log(this.selectedRating);
    const review = reviewForm.value.reviewText;
    console.log(review);
    const rating = this.selectedRating;
    console.log(typeof review, typeof rating);
    console.log(this.studentId, this.teacherId, rating, review);
  }

  // cleanModal() {
  //   this.teacherId = 0;
  //   this.teacherName = "";
  //   this.image = "";
  //   this.review = "Introduce tu valoración";
  //   this.rating = 1;
  //   this.studentId = 0;
  // }
  // saveReview(reviewForm: any) {
  //   console.log(reviewForm.value);
  //   const review = reviewForm.value.reviewText;
  //   const rating = reviewForm.value.rating;
  //   console.log(typeof rating, ",", typeof review);
  //   const resp = this.reviewsService.insertReview(2, 9, 3, review);
  //   console.log(resp);

  // }

}
