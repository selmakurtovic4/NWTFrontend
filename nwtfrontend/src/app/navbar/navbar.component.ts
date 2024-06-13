import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isDropdownOpen: boolean = false;

  constructor(private router: Router) {}
  


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.isDropdownOpen = false; 
  }
}