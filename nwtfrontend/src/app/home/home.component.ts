import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServiceService } from '../services/service.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.serviceService.getAllServices().subscribe(
      (data: Service[]) => {
        this.services = data;
      },
      (error) => {
        console.error('Error fetching services', error);
      }
    );
  }
}
