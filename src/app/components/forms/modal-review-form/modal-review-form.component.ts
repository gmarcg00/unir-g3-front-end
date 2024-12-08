import { Component, inject, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { TeachersService } from '../../../services/teachers.service';
import { AuthService } from '../../../services/auth.service';
import { StudentsService } from '../../../services/students.service';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsService } from '../../../services/reviews.service';


@Component({
  selector: 'app-modal-review',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './modal-review-form.component.html',
  styleUrl: './modal-review-form.component.css'
})
export class ModalReviewComponent {
  /// El padre deberia hacer la comprobacion si existe review antes y pasar la informacion.
  @Input() teacherId: number = 0;
  @Input() teacherName: string = "";
  @Input() image: string = "";
  @Input() review: string = "Introduce tu valoración";
  @Input() rating: number = 1;
  @Input() studentId: number = 0;

  teachersService = inject(TeachersService);
  studentsService = inject(StudentsService);
  authService = inject(AuthService);
  reviewsService = inject(ReviewsService);

  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = this.rating;

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

  // saveReview(reviewForm: any) {
  //   console.log(reviewForm.value);
  //   const review = reviewForm.value.reviewText;
  //   const rating = reviewForm.value.rating;
  //   console.log(typeof rating, ",", typeof review);
  //   const resp = this.reviewsService.insertReview(2, 9, 3, review);
  //   console.log(resp);

  // }


}
