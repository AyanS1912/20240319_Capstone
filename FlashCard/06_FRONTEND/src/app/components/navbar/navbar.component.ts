import { Component, EventEmitter, Output, Input, OnInit, OnChanges, DoCheck } from "@angular/core";
import { SearchService } from "../../services/search.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements DoCheck {
  // Define output event emitters for profile click and search results
  @Output() profileClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() searchClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedComponent: string = "";
  navTitle: string = "Home";

  constructor(private searchService: SearchService) {}


  ngDoCheck(): void {
      if(this.selectedComponent==='deck-card'){
        this.navTitle = 'Home'
        // console.log(this.navTitle)
      }
      else if(this.selectedComponent==='view-decks'){
        this.navTitle = 'My Decks'
        // console.log(this.navTitle)
      }
      else if(this.selectedComponent==='create-deck'){
        this.navTitle = 'Create A Deck'
        // console.log(this.navTitle)
      }
      else if(this.selectedComponent==='view-flashcards'){
        this.navTitle = 'All Flashcards'
        // console.log(this.navTitle)
      }
      else if(this.selectedComponent==='create-flashcard'){
        this.navTitle = 'Create A Flashcard'
        // console.log(this.navTitle)
      }
  }
  // Method to emit profile click event
  openProfile(): void {
    // Emit profile click event to open profile
    this.profileClicked.emit(true);
  }

  // Method to perform search and emit search results
  async search(query: string): Promise<void> {
    try {
      const response = await this.searchService.search(query);
      // Emit search results
      this.searchResults.emit(response);
      this.profileClicked.emit(false);
    } catch (error) {
      console.error("Failed to search:", error);
    }
  }
}
