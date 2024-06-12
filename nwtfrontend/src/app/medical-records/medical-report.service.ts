import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {
  private baseUrl = 'http://localhost:8000/medical-record/medical-report';

  constructor(private http: HttpClient) { }

  getReportsByPatientId(patientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/${patientId}`);
  }
}
