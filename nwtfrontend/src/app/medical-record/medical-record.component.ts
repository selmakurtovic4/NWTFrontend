import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.css'
})
export class MedicalRecordComponent {
  reports = [
    {
      date: '01.01.2024.',
      diagnosis: 'Groznica',
      treatmentPlan: 'Odmor i tečnosti',
      testResults: 'Normalno',
      additionalNotes: 'Nema'
    },
    {
      date: '15.02.2024.',
      diagnosis: 'Glavobolja',
      treatmentPlan: 'Obloge',
      testResults: 'Normalno',
      additionalNotes: 'Nema'
    }
  ];
  referrals = [
    {
      date: '10.03.2024.',
      reason: 'Konsultacija specijalista',
      priority: 'Hitno',
      referringDoctor: 'Dr. Adnan Hadžić',
      referredDoctor: 'Dr. Amela Horić'
    },
    {
      date: '05.04.2024.',
      reason: 'Kontrola',
      priority: 'Redovno',
      referringDoctor: 'Dr. Amela Horić',
      referredDoctor: 'Dr. Zijad Kapidžić'
    }
  ];

  reportExpanded: boolean[] = []; // Array to track expanded state of reports
  referralExpanded: boolean[] = []; // Array to track expanded state of referrals

  constructor() {
    this.reportExpanded = new Array(this.reports.length).fill(false);
    this.referralExpanded = new Array(this.referrals.length).fill(false);
  }

  // Function to toggle expanded state of report at index
  toggleReportDetails(index: number): void {
    this.reportExpanded[index] = !this.reportExpanded[index];
  }

  // Function to toggle expanded state of referral at index
  toggleReferralDetails(index: number): void {
    this.referralExpanded[index] = !this.referralExpanded[index];
  }

}
