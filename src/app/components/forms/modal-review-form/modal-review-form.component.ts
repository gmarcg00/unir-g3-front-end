import { Component, inject, Input } from '@angular/core';
import { TeachersService } from '../../../services/teachers.service';
import { AuthService } from '../../../services/auth.service';
import { StudentsService } from '../../../services/students.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-review',
  standalone: true,
  imports: [],
  templateUrl: './modal-review-form.component.html',
  styleUrl: './modal-review-form.component.css'
})
export class ModalReviewComponent {
  @Input() teacherId: number = 0;
  @Input() teacherName: string = "";
  @Input() image: string = "";
  @Input() review: string = "";
  @Input() rating: number = 0;
  @Input() studentId: number = 0;

  teachersService = inject(TeachersService);
  studentsService = inject(StudentsService);
  authService = inject(AuthService);

  async saveReview() {
    const teacherId = this.teacherId;
    const review = this.review;
    const rating = this.rating;
    const studentId = this.studentId;
    // this.teachersService.addReview(teacherId, review, rating, studentId);
    await Swal.fire("Success", "Review saved", "success");
  }


}
