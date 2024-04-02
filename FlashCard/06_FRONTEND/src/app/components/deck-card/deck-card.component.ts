import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Deck } from "../../interface/deckInterface";
import { DeckService } from "../../services/auth/deck.service";
import { RegisterService } from "../../services/auth/user.service";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";

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
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }


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

  editDeck(deckId: string) {
    this.router.navigate(["/edit-deck", deckId]);
  }

  deleteDeck(deckId: string) {
    // Call the deleteDeck() API method
    console.log("Delete button clicked for deck ID:", deckId);

    this.deckService.deleteDeck(deckId).then(
      (res) => {
        // Handle success
        console.log("Deck deleted successfully:", res);
        // Reload decks after deletion
        // this.loadDecks();
      },
      (error) => {
        // Handle error
        console.error("Failed to delete deck:", error);
      }
    );
  }

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
      })
      .catch((error) => {
        console.error("Failed to upvote deck:", error);
      });
  }

  downvoteDeck(deckId: string): void {
    this.voteService
      .downvoteDeck(deckId)
      .then((data) => {
        // Update the deck's downvote count
        console.log(data);
        this.reloadDecks.emit();
      })
      .catch((error) => {
        console.error("Failed to downvote deck:", error);
      });
  }
}
