import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse, RegisterRequest } from './register';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
 // private apiServerUrl = environment.apiBaseUrl;

 // private baseUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) { }

  registerUser(registerData: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('http://localhost:8000/auth/auth/register-patient', registerData);
  }
}
