import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      // Logic to determine whether to show navbar based on current route
      if (this.router.url === '**' || this.router.url === '/login' || this.router.url === '/register') {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }
}
