import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationCredentials, AuthenticationResponse } from './login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  loginUser(form: NgForm) {
    const loginData: AuthenticationCredentials = form.value;
    this.loginService.loginUser(loginData).subscribe(
      (response: AuthenticationResponse) => {
        console.log('Login successful', response);
        sessionStorage.setItem('currentUser', JSON.stringify(response));
        this.loginService.notifyLoginStatusChange(); 
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
  navigate(url: string) {
    this.router.navigate([url]);
  }
}
