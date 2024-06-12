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
  records: MedicalRecord[] = [
    { id: 1, patientName: 'John Doe', doctor: 'Dr. Smith', date: new Date('2023-05-01'), details: 'Regular check-up' },
    { id: 2, patientName: 'Jane Roe', doctor: 'Dr. Jones', date: new Date('2023-06-10'), details: 'Follow-up visit' },
    // Add more sample records as needed
  ];
  selectedRecord: MedicalRecord | null = null;

  viewDetails(record: MedicalRecord): void {
    this.selectedRecord = record;
  }

  closeDetails(): void {
    this.selectedRecord = null;
  }
}
