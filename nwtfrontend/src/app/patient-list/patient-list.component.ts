import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: any = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    });
  }
}
