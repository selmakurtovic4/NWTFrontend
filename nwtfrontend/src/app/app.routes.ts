import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { AppointmentPatientComponent } from './appointment/appointment-patient/appointment-patient.component';
import { StaffReviewComponent } from './staff-review/staff-review.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'medical-records', component: MedicalRecordsComponent },
    { path: 'schedule', component: AppointmentPatientComponent },
    { path: 'staff-review', component: StaffReviewComponent },
    { path: 'patients', component: PatientListComponent},
    { path: 'patient-details/:id', component: PatientDetailsComponent}
];
