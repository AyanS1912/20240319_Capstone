import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Deck } from "../../interface/deckInterface";
import { DeckService } from "../../services/auth/deck.service";
import { RegisterService } from "../../services/auth/user.service";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-deck-card",
  templateUrl: "./deck-card.component.html",
  styleUrl: "./deck-card.component.css",
})
export class DeckCardComponent implements OnInit {
  @Input() decks: Deck[] = [];
  @Input() userDetails: any;
  @Output() reloadDecks: EventEmitter<any> = new EventEmitter();

  constructor(
    private deckService: DeckService,
    private userService: RegisterService,
    private router: Router,
    private voteService: VoteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Method to fetch user details
  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userDetails = data;
        // console.log(this.userDetails)
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
      }
    );
  }

  // Method to navigate to edit deck page
  editDeck(deckId: string) {
    this.router.navigate(["/edit-deck", deckId]);
  }

  // Method to delete a deck
  deleteDeck(deckId: string) {
    // Call the deleteDeck() API method
    console.log("Delete button clicked for deck ID:", deckId);

    this.deckService.deleteDeck(deckId).then(
      (res) => {
        // Handle success
        console.log("Deck deleted successfully:", res);
        this.reloadDecks.emit(); // Reload decks after deletion
        this.snackBar.open("Deck deleted successfully", "", { duration: 3000 }); // Display success message
      },
      (error) => {
        // Handle error
        console.error("Failed to delete deck:", error);
        this.snackBar.open("Failed to delete deck. Please try again.", "", { duration: 3000 }); // Display error message
      }
    );
  }

  // Method to navigate to flashcards of a deck
  showFlashcards(deckId: string) {
    // Navigate to the component that displays flashcards for the selected deck
    this.router.navigate(["/deck-flashcards", deckId]);
  }

  upvoteDeck(deckId: string): void {
    this.voteService
      .upvoteDeck(deckId)
      .then((data) => {
        // Update the deck's upvote count
        console.log(data);
        this.reloadDecks.emit();
        this.snackBar.open("Upvoted successfully", "", { duration: 3000 }); 
      })
      .catch((error) => {
        console.error("Failed to upvote deck:", error);
        this.snackBar.open("Failed to upvote deck. Please try again.", "", { duration: 3000 });
        
      });
  }

  downvoteDeck(deckId: string): void {
    this.voteService
      .downvoteDeck(deckId)
      .then((data) => {
        // Update the deck's downvote count
        console.log(data);
        this.reloadDecks.emit();
        this.snackBar.open("Downvoted successfully", "", { duration: 3000 }); 
      })
      .catch((error) => {
        console.error("Failed to downvote deck:", error);
        this.snackBar.open("Failed to downvote deck. Please try again.", "", { duration: 3000 });
      });
  }
}
