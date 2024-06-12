import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MedicalReport {
  date: string;
  diagnosis: string;
  treatmentPlan: string;
  testResults: string;
  additionalNotes: string;
}

interface DoctorReferral {
  date: string;
  reason: string;
  priority: string;
  referringDoctor: string;
  referredDoctor: string;
}

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent {
  reports: MedicalReport[] = [
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

  reports1: MedicalReport[] = [
    {
      date: '03.04.2024.',
      diagnosis: 'Upala grla',
      treatmentPlan: 'Odmor i tečnosti',
      testResults: 'Upala',
      additionalNotes: 'Nema'
    },
    {
      date: '17.05.2024.',
      diagnosis: 'Bol u prsima',
      treatmentPlan: 'Pregled kod kardiologa',
      testResults: 'Normalno',
      additionalNotes: 'Nema'
    }
  ];

  referrals: DoctorReferral[] = [
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

  referrals1: DoctorReferral[] = [
    {
      date: '28.05.2024.',
      reason: 'Pregled srca',
      priority: 'Hitno',
      referringDoctor: 'Dr. Elvedin Karić',
      referredDoctor: 'Dr. Amela Horić'
    },
    {
      date: '01.04.2024.',
      reason: 'Kontrola',
      priority: 'Redovno',
      referringDoctor: 'Dr. Zijad Kapidžić',
      referredDoctor: 'Dr. Elvedin Karić'
    }
  ];

  reportExpanded: boolean[] = [false, false];
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

  toggleReportDetails(index: number) {
    this.reportExpanded[index] = !this.reportExpanded[index];
  }

  referralExpanded: boolean[] = [false, false];

  toggleReferralDetails(index: number) {
    this.referralExpanded[index] = !this.referralExpanded[index];
  }
}