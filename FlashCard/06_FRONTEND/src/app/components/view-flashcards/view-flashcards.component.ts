import { Component, OnInit } from "@angular/core";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-flashcards",
  templateUrl: "./view-flashcards.component.html",
  styleUrl: "./view-flashcards.component.css",
})
export class ViewFlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  constructor(
    private flashcardService: FlashcardServiceService,
    private router: Router
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
}
