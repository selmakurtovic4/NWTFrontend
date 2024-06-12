import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationCredentials, AuthenticationResponse, RegisterRequest } from './login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(loginData: AuthenticationCredentials): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('http://localhost:8000/auth/auth/login', loginData);
  }
}
