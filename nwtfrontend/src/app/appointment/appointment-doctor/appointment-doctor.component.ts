import { Component, OnInit } from '@angular/core';
import { AppointmentResponse } from '../shared/appointment';
import { AppointmentService } from '../shared/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-doctor.component.html',
  styleUrl: './appointment-doctor.component.css'
})

export class AppointmentDoctorComponent implements OnInit {
  appointments: AppointmentResponse[] = [];
  loading: boolean = true;
  doctorId: number = 0;
  token: string = '';

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.doctorId = currentUser.user.id;
    this.token = currentUser.accessToken;
    this.getTodayAppointments();
  }

  getTodayAppointments(): void {
    this.appointmentService.getTodayDoctorAppointments(this.doctorId, this.token).subscribe(
      (data: AppointmentResponse[]) => {
        this.appointments = data;
        this.loading = false;
      },
      (error) => {
        console.error('Greška prilikom dohvaćanja današnjih termina', error);
        this.loading = false; 
      }
    );
  }
}