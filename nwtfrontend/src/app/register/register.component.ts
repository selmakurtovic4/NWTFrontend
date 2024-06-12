import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationResponse } from './register';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  errors: { [key: string]: string } = {};

  constructor(private router: Router, private registerService: RegisterService) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }

  public registerUser(addForm: NgForm): void {
    this.registerService.registerUser(addForm.value).subscribe(
      (response: AuthenticationResponse) => {
        console.log(response);
        this.errors = {};
        addForm.reset();
        this.navigate('/login');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error) {
          this.errors = error.error;
        } else {
          alert('Došlo je do greške. Pokušajte ponovo.');
        }
      }
    );
  }
}
