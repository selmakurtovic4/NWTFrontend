import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MedicalRecord {
  id: number;
  patientName: string;
  doctor: string;
  date: Date;
  details: string;
}

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent {
  expandedPatientId: number | null = null;

  togglePatient(patientId: number): void {
    if (this.isPatientExpanded(patientId)) {
      this.expandedPatientId = null;
    } else {
      this.expandedPatientId = patientId;
    }
  }

  isPatientExpanded(patientId: number): boolean {
    return this.expandedPatientId === patientId;
  }
}