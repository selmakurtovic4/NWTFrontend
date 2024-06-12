import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  standalone: true,
  imports: [RouterModule]  // Ensure RouterModule is imported here
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
