import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FlashMastery';

  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    const url = this.router.url;
    return !(url === '**' || url === '/login' || url === '/register');
  }
}
