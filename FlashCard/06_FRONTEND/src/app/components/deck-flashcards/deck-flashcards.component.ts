import { Component, OnInit } from "@angular/core";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterService } from "../../services/auth/user.service";
import { VoteService } from "../../services/vote/vote.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-deck-flashcards",
  templateUrl: "./deck-flashcards.component.html",
  styleUrl: "./deck-flashcards.component.css",
})
export class DeckFlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  deckId: string | null = "";
  userDetails: any;
  constructor(
    private flashcardService: FlashcardServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: RegisterService,
    private voteService: VoteService,
    private snackBar: MatSnackBar,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.initializeFlipCards();
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get("id");
      if (this.deckId) {
        this.fetchFlashcards(this.deckId); // Fetch flashcards based on deckId
      }
    });
  }

  // Method to upvote a flashcard
  upvoteFlashcard(flashcardId: string): void {
    // Call the upvoteFlashcard() API method
    this.voteService.upvoteFlashcard(flashcardId).then(
      (res) => {
        console.log("Flashcard upvoted successfully:", res);
        // Reload flashcards after upvote
        if (this.deckId) {
          this.fetchFlashcards(this.deckId);
        }
        this.snackBar.open("Flashcard upvoted successfully", "", {
          duration: 3000,
        });
      },
      (error) => {
        console.error("Failed to upvote Flashcard:", error);
        this.snackBar.open(
          "Failed to upvote Flashcard. Please try again.",
          "",
          { duration: 3000 }
        );
      }
    );
  }

  downvoteFlashcard(flashcardId: string): void {
    // Call the downvoteFlashcard() API method
    this.voteService.downvoteFlashcard(flashcardId).then(
      (res) => {
        console.log("Flashcard downvoted successfully:", res);
        // Reload flashcards after downvote
        if (this.deckId) {
          this.fetchFlashcards(this.deckId);
        }
        this.snackBar.open("Flashcard downvoted successfully", "", { duration: 3000 });
      },
      (error) => {
        console.error("Failed to downvote Flashcard:", error);
        this.snackBar.open("Failed to downvote Flashcard. Please try again.", "", { duration: 3000 });
      }
    );
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
  initializeFlipCards(): void {
    const flipCards = document.querySelectorAll(".flip-card-click");

    flipCards.forEach((card) => {
      card.addEventListener("click", function () {
        card.classList.toggle("flipped");
      });
    });
  }

  // Method to fetch flashcards based on deckId
  fetchFlashcards(deckId: string) {
    this.flashcardService.getAllFlashcards().then(
      (data: any) => {
        this.flashcards = data.data;
        console.log(this.flashcards);

        this.flashcards = this.flashcards.filter(
          (card) => card.deckId.toString() === deckId
        );
        console.log(this.flashcards);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Method to navigate to edit flashcard page
  editFlashcard(flashcardId: string) {
    console.log("clicked");

    // Navigate to the edit page with the flashcard ID as a parameter
    this.router.navigate(["/edit-flashcard", flashcardId]);
  }

  // Method to delete a flashcard
  deleteFlashcard(flashcardId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete this flashcard?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion
        this.flashcardService.deleteFlashcard(flashcardId).then(
          (res) => {
            this.snackBar.open("Flashcard deleted successfully", "", {
              duration: 3000,
            });
            console.log("Flashcard deleted successfully:", res);
            // Reload flashcards after deletion
            if(this.deckId)
              this.fetchFlashcards(this.deckId);
          },
          (error) => {
            // Handle error
            console.error("Failed to delete Flashcard :", error);
            this.snackBar.open("Failed to delete Flashcard", "", {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
