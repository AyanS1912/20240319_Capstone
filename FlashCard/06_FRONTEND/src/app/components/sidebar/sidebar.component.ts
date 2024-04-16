import { Output, EventEmitter, Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements DoCheck{
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();
  isCollapsed: boolean = false;
  selectedComponent: string = 'deck-card';
  forFlashCreate : boolean = false


  constructor (
    private router : Router,
    private sharedService : SharedService
    
  ){}

  ngDoCheck(): void {
      this.forFlashCreate = this.sharedService.createCard
      if(this.forFlashCreate){
        this.selectedComponent ='create-flashcard'
        this.handleClick(this.selectedComponent)
      }
  }
  // Function to handle button clicks
  handleClick(componentName: string) {
    this.selectedComponent = componentName;
    this.buttonClicked.emit(componentName);
    this.sharedService.createCard = false   
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
