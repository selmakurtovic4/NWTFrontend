import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AppointmentResponse, AppointmentStatus, UserResponse } from '../shared/appointment';
import { AppointmentService } from '../shared/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentBookComponent } from '../appointment-book/appointment-book.component';

@Component({
  selector: 'app-appointment-patient',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './appointment-patient.component.html',
  styleUrl: './appointment-patient.component.css'
})

export class AppointmentPatientComponent implements OnInit {
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

  selectedAppointmentIdToDelete: number | null = null;

  @ViewChild('cancelDialogTemplate') cancelDialogTemplate!: TemplateRef<any>; 

  constructor(private appointmentService: AppointmentService, private popupService: AppointmentService, private dialog: MatDialog) {}

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
            // Uspješno rezervisan termin
          },
          (error) => {
            console.error('Error booking appointment:', error);
          }
        );
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentBookComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  cancelAppointment(appointmentId: number): void {
    if (this.token) {
      this.appointmentService.changeAppointmentStatus(appointmentId, AppointmentStatus.CANCELLED, this.token).subscribe({
        next: (updatedAppointment) => {
          this.upcomingAppointments = this.upcomingAppointments.map(appointment =>
            appointment.id === appointmentId ? updatedAppointment : appointment
          );
        },
        error: (err) => {
          console.error('Error cancelling appointment', err);
        }
      });
    } else {
      console.error('Token is null. Cannot cancel appointment.');
    }
  }

  openCancelConfirmationDialog(appointmentId: number): void {
    this.selectedAppointmentIdToDelete = appointmentId;
    this.dialog.open(this.cancelDialogTemplate);
  }
  
  closeCancelConfirmationDialog(): void {
    this.selectedAppointmentIdToDelete = null;
    this.checkSessionAndFetchAppointments();
    this.dialog.closeAll();
  }
}