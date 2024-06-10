import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(private router: Router) {}
  
  navigate(route: string) {
    this.router.navigate([route]);
  }
  
  
}
