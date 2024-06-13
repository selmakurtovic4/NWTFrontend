import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentResponse, AppointmentStatus, UserResponse } from './appointment';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentBookComponent } from '../appointment-book/appointment-book.component';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  getUpcomingAppointments(patientId: number, token: string): Observable<AppointmentResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AppointmentResponse[]>(`http://localhost:8000/appointment/appointment/upcomingPatientAppointments/${patientId}`, { headers });
  }

  getAvailableAppointments(doctorId: number, date: string, token: string): Observable<AppointmentResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('doctorId', doctorId.toString())
      .set('date', date);
    return this.http.get<AppointmentResponse[]>('http://localhost:8000/appointment/appointment/available', { headers, params });
  }

  bookAppointment(appointmentId: number, patientId: number, token: string): Observable<AppointmentResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<AppointmentResponse>(`http://localhost:8000/appointment/appointment/${appointmentId}/book/${patientId}`, {}, { headers });
  }

  getAllDoctors(token: string): Observable<UserResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserResponse[]>('http://localhost:8000/auth/user/doctors', { headers });
  }

  changeAppointmentStatus(appointmentId: number, status: AppointmentStatus, token: string): Observable<AppointmentResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('status', status);
    return this.http.put<AppointmentResponse>(`http://localhost:8000/appointment/appointment/${appointmentId}/status`, null, { headers, params });
  }

    
}
