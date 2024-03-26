import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() profileClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  openProfile() : void{
    this.profileClicked.emit(true);
    console.log("Clicked");    
  }
}
