import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    MedicalRecordsComponent,
    RouterModule.forRoot(routes)  // Add this line to import RouterModule with your routes
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}
  
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
