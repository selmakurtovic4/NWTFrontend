import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  isDropdownOpen: boolean = false;
  isPatient: boolean = false;
  isDoctor: boolean = false; 
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private loginService: LoginService) {}

  ngOnInit(): void {
    this.checkUserStatus();
    this.loginService.loginStatus$.subscribe(() => {
      this.checkUserStatus();
    });
  }

  checkUserStatus(): void {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      this.isPatient = currentUser.user.role === 'PATIENT';
      this.isDoctor = currentUser.user.role === 'DOCTOR'; // Check if the user is a doctor
      this.isLoggedIn = true;
      this.username = currentUser.user.username;
    } else {
      this.isLoggedIn = false;
      this.username = null;
    }
    this.cdr.detectChanges();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.isDropdownOpen = false;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.username = null;
    this.router.navigate(['/login']);
    this.cdr.detectChanges();
  }
}