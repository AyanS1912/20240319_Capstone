import { Component, EventEmitter, Output } from "@angular/core";
import { SearchService } from "../../services/search.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  @Output() profileClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchResults: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private searchService: SearchService) {}

  openProfile(): void {
    this.profileClicked.emit(true);
    // console.log("Clicked");
  }

  async search(query: string): Promise<void> {
    try {
      const response = await this.searchService.search(query);
      // Emit search results
      this.searchResults.emit(response);
    } catch (error) {
      console.error('Failed to search:', error);
    }
  }
}
