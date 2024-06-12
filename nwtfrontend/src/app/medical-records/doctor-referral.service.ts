import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorReferralService {
  private baseUrl = 'http://localhost:8000/medical-record/doctor-referral';

  constructor(private http: HttpClient) { }

  getReferralsByPatientId(patientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/${patientId}`);
  }
}
