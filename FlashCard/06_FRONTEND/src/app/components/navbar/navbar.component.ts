import { Component, EventEmitter, Output } from "@angular/core";
import { SearchService } from "../../services/search.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  // Define output event emitters for profile click and search results
  @Output() profileClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() searchClicked: EventEmitter<void> = new EventEmitter<void>();
  selectedComponent: string = 'Home';

  constructor(private searchService: SearchService) {}

  // Method to emit profile click event
  openProfile(): void {
    // Emit profile click event to open profile
    this.profileClicked.emit(true);
    // Emit search click event to turn off search results
    // this.searchClicked.emit();
  }

  // Method to perform search and emit search results
  async search(query: string): Promise<void> {
    try {
      const response = await this.searchService.search(query);
      // Emit search results
      this.searchResults.emit(response);
      this.profileClicked.emit(false);
    } catch (error) {
      console.error('Failed to search:', error);
    }
  }
}
