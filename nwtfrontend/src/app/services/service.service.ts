import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:8000/service';

  constructor(private http: HttpClient) { }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }

  addService(service: Service): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, service, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getServicesByDepartmentId(departmentId: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/department/${departmentId}`);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/all`);
  }
}
