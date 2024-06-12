import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewResponse, UserResponse } from './staff-review';

@Injectable({
  providedIn: 'root'
})

export class StaffReviewService {

  constructor(private http: HttpClient) { }

  getDoctorReviews(doctorId: number, token: string): Observable<ReviewResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ReviewResponse[]>(`http://localhost:8000/appointment/review/getDoctorReviews/${doctorId}`, { headers });
  }

  getAllDoctors(token: string): Observable<UserResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserResponse[]>('http://localhost:8000/auth/user/doctors', { headers });
  }

  getUserById(userId: number, headers: HttpHeaders): Observable<UserResponse> {
    return this.http.get<UserResponse>(`http://localhost:8000/auth/user/${userId}`, { headers });
  }

  
}
