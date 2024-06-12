import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient/patient.service';
import { MedicalReportService } from '../medical-records/medical-report.service';
import { DoctorReferralService } from '../medical-records/doctor-referral.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient: any;
  medicalReports: any = [];
  doctorReferrals: any = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private medicalReportService: MedicalReportService,
    private doctorReferralService: DoctorReferralService
  ) { }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.patientService.getPatientById(+patientId).subscribe(data => {
        this.patient = data;
      });

      this.medicalReportService.getReportsByPatientId(+patientId).subscribe(data => {
        this.medicalReports = data;
      });

      this.doctorReferralService.getReferralsByPatientId(+patientId).subscribe(data => {
        this.doctorReferrals = data;
      });
    }
  }
}
