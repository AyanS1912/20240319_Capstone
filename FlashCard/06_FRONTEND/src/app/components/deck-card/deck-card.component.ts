import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Deck } from "../../interface/deckInterface";
import { DeckService } from "../../services/deck/deck.service";
import { RegisterService } from "../../services/auth/user.service";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-deck-card",
  templateUrl: "./deck-card.component.html",
  styleUrl: "./deck-card.component.css",
})
export class DeckCardComponent implements OnInit {
  @Input() decks: Deck[] = [];
  @Input() userDetails: any;
  @Output() reloadDecks: EventEmitter<any> = new EventEmitter();
  @Output() newDeck: EventEmitter<string> = new EventEmitter<string>();
  @Output() createDeckClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private deckService: DeckService,
    private userService: RegisterService,
    private router: Router,
    private voteService: VoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data: {
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this deck?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.deckService.deleteDeck(deckId).then(
          (res) => {
            console.log("Deck deleted successfully:", res);
            this.reloadDecks.emit();
            this.snackBar.open("Deck deleted successfully", "", {
              duration: 3000,
            });
          },
          (error) => {
            console.error("Failed to delete deck:", error);
            this.snackBar.open("Failed to delete deck. Please try again.", "", {
              duration: 3000,
            });
          }
        );
      }
    });
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
        this.reloadDecks.emit();
        this.snackBar.open(data.message, "", { duration: 3000 });
      })
      .catch((error) => {
        // console.error("Failed to upvote deck:", error);
        this.snackBar.open("Failed to upvote deck. Please try again.", "", {
          duration: 3000,
        });
      });
  }

  downvoteDeck(deckId: string): void {
    this.voteService
      .downvoteDeck(deckId)
      .then((data) => {
        // Update the deck's downvote count
        this.reloadDecks.emit();
        this.snackBar.open(data.message, "", { duration: 3000 });
      })
      .catch((error) => {
        console.error("Failed to downvote deck:", error);
        this.snackBar.open("Failed to downvote deck. Please try again.", "", {
          duration: 3000,
        });
      });
  }

  openConfirmationDialog(deckId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "300px",
      data: "Are you sure you want to delete this deck?",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDeck(deckId);
      }
    });
  }

  createNewDeck() {
    this.createDeckClicked.emit();
    // console.log("emiited")
  }
}
