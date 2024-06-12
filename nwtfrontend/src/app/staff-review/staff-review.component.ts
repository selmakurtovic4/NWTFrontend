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
  patientUsernames: { [key: number]: string } = {}; // Mapa za čuvanje korisničkih imena pacijenata

  showReviews: boolean = false;

  constructor(private staffReviewService: StaffReviewService) { }

  ngOnInit(): void {
    this.showReviews = true;
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
          // Za svaku recenziju dobijamo korisničko ime pacijenta
          await Promise.all(reviews.map(async (review) => {
            review.patientUsername = await this.getPatientUsername(review.appointment.patientId);
          }));
          this.doctorReviews[doctorId] = reviews;
        } else {
          this.doctorReviews[doctorId] = [];
          console.error(`No reviews data received for doctorId: ${doctorId}`);
        }
      } catch (error) {
        this.doctorReviews[doctorId] = [];
        console.error('Error fetching doctor reviews:', error);
      }
    } else {
      console.error('Token is null.');
    }
  }
  

  async getPatientUsername(patientId: number): Promise<string> {
    if (!this.patientUsernames[patientId]) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      try {
        const user = await this.staffReviewService.getUserById(patientId, headers).toPromise();
        if (user) {
          this.patientUsernames[patientId] = user.username;
        } else {
          console.error(`User with id ${patientId} not found.`);
        }
      } catch (error) {
        console.error(`Error fetching user with id ${patientId}:`, error);
      }
    }
    return this.patientUsernames[patientId] || '';
  }
  

  getStars(rating: number): number[] {
    return Array(rating).fill(0).map((x, i) => i);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0).map((x, i) => i);
  }

  isLoading(doctorId: number): boolean {
    return !this.doctorReviews[doctorId] || this.doctorReviews[doctorId].length === 0;
  }

}