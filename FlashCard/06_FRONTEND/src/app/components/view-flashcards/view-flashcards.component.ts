import { Component, OnInit } from "@angular/core";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";

@Component({
  selector: "app-view-flashcards",
  templateUrl: "./view-flashcards.component.html",
  styleUrl: "./view-flashcards.component.css",
})
export class ViewFlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  constructor(
    private flashcardService: FlashcardServiceService,
    private router: Router,
    private voteService : VoteService
  ) {}

  ngOnInit(): void {
    this.initializeFlipCards();
    this.fetchFlashcards();
  }

  initializeFlipCards(): void {
    const flipCards = document.querySelectorAll(".flip-card-click");

    flipCards.forEach((card) => {
      card.addEventListener("click", function () {
        card.classList.toggle("flipped");
      });
    });
  }

  fetchFlashcards() {
    this.flashcardService.getAllFlashcards().then(
      (data: any) => {
        this.flashcards = data.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editFlashcard(flashcardId: string) {
    console.log("clicked");
    
    // Navigate to the edit page with the flashcard ID as a parameter
    this.router.navigate(["/edit-flashcard", flashcardId]);
  }

  deleteFlashcard(flashcardId: string) {
    // Call the deleteDeck() API method
    this.flashcardService.deleteFlashcard(flashcardId).then(
      (res) => {
        console.log("Flashcard deleted successfully:", res);
        // Reload decks after deletion
        this.fetchFlashcards();
      },
      (error) => {
        // Handle error
        console.error("Failed to delete Flashcard :", error);
      }
    );
  }

  upvoteFlashcard(flashcardId: string): void {
    // Call the upvoteFlashcard() API method
    this.voteService.upvoteFlashcard(flashcardId).then(
      (res) => {
        console.log("Flashcard upvoted successfully:", res);
        // Reload flashcards after upvote
        this.fetchFlashcards();
      },
      (error) => {
        console.error("Failed to upvote Flashcard:", error);
      }
    );
  }

  downvoteFlashcard(flashcardId: string): void {
    // Call the downvoteFlashcard() API method
    this.voteService.downvoteFlashcard(flashcardId).then(
      (res) => {
        console.log("Flashcard downvoted successfully:", res);
        // Reload flashcards after downvote
        this.fetchFlashcards();
      },
      (error) => {
        console.error("Failed to downvote Flashcard:", error);
      }
    );
  }
}
