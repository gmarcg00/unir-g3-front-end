import { Component, inject, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { TeachersService } from '../../services/teachers.service';
import { AuthService } from '../../services/auth.service';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { ITeacherInfoInterface } from '../../interfaces/iTeacherInfoInterface';

@Component({
  selector: 'app-puntua-profe',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterLink],
  templateUrl: './puntua-profe.component.html',
  styleUrl: './puntua-profe.component.css'
})
export class PuntuaProfeComponent {

  teachersService = inject(TeachersService);
  studentsService = inject(StudentsService);
  authService = inject(AuthService);
  reviewsService = inject(ReviewsService);

  teacherId: number = 0;
  studentId: number = 0;
  rating: number = 1;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = this.rating;
  teacherData: any;
  ratingText: string = "";

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const teacherStrId = navigation?.extras.state?.['teacherId'] || null;
    console.log("recibiendo Teacher ID", teacherStrId);
    this.teacherId = Number(teacherStrId);
    const studentStrId = navigation?.extras.state?.['studentId'] || null;
    console.log("recibiendo student ID", studentStrId);
    this.studentId = Number(studentStrId);
    const resp = this.teachersService.getTeacherInfo(this.teacherId);
    resp.then((data) => {
      this.teacherData = data;
      console.log(this.teacherData);
    })
    const respReview = this.reviewsService.getTeacherRate(this.studentId, this.teacherId);
    respReview.then((data) => {
      if (data) {
        this.selectedRating = data.rating;
        this.ratingText = data.text_rating;
      } else {
        this.ratingText = "no data";
      }
    })
  }

  selectRating(rating: number): void {
    this.selectedRating = rating;
    console.log(this.selectedRating)
  }

  saveReview(reviewForm: any): void {
    console.log(this.selectedRating);
    let review = reviewForm.value.reviewText;
    if (review === "") {
      review = this.ratingText;
    }
    console.log("texto review:", review);
    const rating = this.selectedRating;
    console.log(typeof review, typeof rating);
    console.log(this.studentId, this.teacherId, rating, review);
    const resp = this.reviewsService.insertReview(this.studentId, this.teacherId, rating, review);
    // validar que son correctos los datos ...
    resp.then((data) => {
      console.log(data);
      if (data) {
        Swal.fire({
          title: 'Review guardada',
          text: 'Gracias por tu opinion',
          icon: 'success',
          background: "#202020",
          color: "#fff",
          timer: 1500
        })
        this.router.navigate(['/teachers']);
      }
    })
  }

}