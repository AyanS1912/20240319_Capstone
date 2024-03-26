import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedComponent: string = 'deck-card'; 
  isProfileOpen: boolean = false;

  onButtonClicked(component: string) {
    this.isProfileOpen = false
    this.selectedComponent = component;
    console.log(this.selectedComponent);
    
  }

  openMyProfile(open: boolean): void {
    console.log("Profile Clocked");
    this.isProfileOpen = open;
    this.selectedComponent =''
  }
}
