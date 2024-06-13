import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppointmentResponse, UserResponse } from '../shared/appointment';
import { AppointmentService } from '../shared/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-appointment-book',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule],
  templateUrl: './appointment-book.component.html',
  styleUrl: './appointment-book.component.css'
})
export class AppointmentBookComponent {
  
  constructor(private appointmentService: AppointmentService, private popupService: AppointmentService) {}


  loading: boolean = true;
  hasSession: boolean = false;
  upcomingAppointments: AppointmentResponse[] = [];
  doctors: UserResponse[] = [];
  selectedDoctorId: number | null = null;
  selectedDate: string | null = null;
  availableAppointments: AppointmentResponse[] = [];
  selectedAppointmentId: number | null = null;
  userId: number | null = null;
  token: string | null = null;
  isPopupOpen: boolean = false;
  modalOpen: boolean = false;
  successMessage: string | null = null;


  ngOnInit(): void {
    this.checkSessionAndFetchAppointments();
    this.getAllDoctors();
  }

  checkSessionAndFetchAppointments(): void {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      this.userId = currentUser.user.id;
      this.token = currentUser.accessToken;
      this.hasSession = true;
      if (this.userId !== null && this.token !== null) {
        this.fetchUpcomingAppointments(this.userId, this.token);
      } else {
        console.error('User ID or token is null. Cannot fetch appointments.');
      }
    } else {
      this.loading = false;
      console.error('Session not found. Please log in.');
    }
  }

  fetchUpcomingAppointments(userId: number, token: string): void {
    this.appointmentService.getUpcomingAppointments(userId, token).subscribe(
      (data: AppointmentResponse[]) => {
        this.upcomingAppointments = data;
        this.loading = false; 
      },
      (error) => {
        console.error('Error fetching upcoming appointments:', error);
        this.loading = false; 
      }
    );
  }

  getAllDoctors(): void {
    if (this.token) {
      this.appointmentService.getAllDoctors(this.token).subscribe(
        (data: UserResponse[]) => {
          this.doctors = data;
        },
        (error) => {
          console.error('Error fetching doctors:', error);
        }
      );
    } else {
      console.error('Token is null. Please log in.');
    }
  }

  onSelectDoctor(): void {
    this.fetchAvailableAppointments();
  }

  onSelectDate(): void {
    this.fetchAvailableAppointments();
  }

  fetchAvailableAppointments(): void {
    if (this.selectedDoctorId && this.selectedDate && this.token) {
      this.appointmentService
        .getAvailableAppointments(
          this.selectedDoctorId,
          this.selectedDate,
          this.token
        )
        .subscribe(
          (data: AppointmentResponse[]) => {
            this.availableAppointments = data;
          },
          (error) => {
            console.error('Error fetching available appointments:', error);
          }
        );
    }
  }

  bookSelectedAppointment(): void {
    if (this.selectedAppointmentId && this.userId && this.token) {
      this.appointmentService
        .bookAppointment(
          this.selectedAppointmentId,
          this.userId,
          this.token
        )
        .subscribe(
          (data: AppointmentResponse) => {
            this.successMessage = 'Uspješno ste zakazali pregled!';
            setTimeout(() => {
              this.successMessage = null;
            }, 3000); // Skloniti poruku nakon 3 sekunde
          },
          (error) => {
            console.error('Error booking appointment:', error);
          }
        );
    }
  }

}
