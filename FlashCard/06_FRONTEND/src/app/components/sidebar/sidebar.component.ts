import { Output, EventEmitter, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor (
    private router : Router,

  ){}
  // Function to handle button clicks
  handleClick(componentName: string) {
    this.buttonClicked.emit(componentName);    
  }

  // Logout the user
  signout(){
    localStorage.clear() // clear the localstorage
    this.router.navigate(['/login'])

  }
}
