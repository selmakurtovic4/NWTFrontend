import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8000/patient/patient';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
