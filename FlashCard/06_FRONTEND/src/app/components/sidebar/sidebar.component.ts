import { Output, EventEmitter, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();
  isCollapsed: boolean = false;
  selectedComponent: string = 'home';


  constructor (
    private router : Router,

  ){}
  // Function to handle button clicks
  handleClick(componentName: string) {
    this.selectedComponent = componentName;
    console.log("curerent",componentName)
    this.buttonClicked.emit(componentName);    
  }

  // Logout the user
  signout(){
    sessionStorage.clear() // clear the sessionStorage
    this.router.navigate(['/login'])

  }

  // Method to toggle sidebar collapse/expand
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
