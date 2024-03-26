import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedComponent: string = 'deck-card'; // Default component

  onButtonClicked(component: string) {
    this.selectedComponent = component;
    console.log(this.selectedComponent);
    
  }
}
