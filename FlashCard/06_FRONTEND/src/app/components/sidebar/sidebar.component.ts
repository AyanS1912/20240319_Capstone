import { Output, EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  // Function to handle button clicks
  handleClick(componentName: string) {
    this.buttonClicked.emit(componentName);    
  }
}
