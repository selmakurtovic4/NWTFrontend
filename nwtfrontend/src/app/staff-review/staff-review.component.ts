import { Component, OnInit } from '@angular/core';
import { StaffReviewService } from './staff-review.service';
import { ReviewResponse } from './staff-review';
import { UserResponse } from '../login/login';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-staff-review',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './staff-review.component.html',
  styleUrl: './staff-review.component.css'
})


export class StaffReviewComponent implements OnInit {
  doctors: UserResponse[] = [];
  doctorReviews: { [key: number]: ReviewResponse[] } = {};
  userId: string | null = null;
  token: string | null = null;

  showReviews: boolean = false;

  constructor(private staffReviewService: StaffReviewService) { }

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      this.userId = currentUser.user.id;
      this.token = currentUser.accessToken;
      this.getAllDoctors();
    } else {
      console.error('User data not found in session storage.');
    }
  }

  async getAllDoctors(): Promise<void> {
    if (this.token !== null) {
      try {
        const doctors = await this.staffReviewService.getAllDoctors(this.token).toPromise();
        if (doctors) {
          this.doctors = doctors;
          await Promise.all(this.doctors.map(doctor => this.getDoctorReviews(doctor.id)));
        } else {
          console.error('No doctors data received');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    } else {
      console.error('Token is null.');
    }
  }

  async getDoctorReviews(doctorId: number): Promise<void> {
    if (this.token !== null) {
      try {
        const reviews = await this.staffReviewService.getDoctorReviews(doctorId, this.token).toPromise();
        if (reviews) {
          this.doctorReviews[doctorId] = reviews;
        } else {
          console.error(`No reviews data received for doctorId: ${doctorId}`);
        }
      } catch (error) {
        console.error('Error fetching doctor reviews:', error);
      }
    } else {
      console.error('Token is null.');
    }
  }

  getDoctorInfo(doctorId: number): void {
    if (this.token !== null) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      this.staffReviewService.getUserById(doctorId, headers).subscribe(
        (data) => {
          const doctorName = data.firstname + ' ' + data.lastname;
          console.log('Doctor Name:', doctorName);
        },
        (error) => {
          console.error('Error fetching doctor info:', error);
        }
      );
    } else {
      console.error('Token is null.');
    }
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0).map((x, i) => i);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0).map((x, i) => i);
  }

}