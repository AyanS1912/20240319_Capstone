import { Component, OnInit} from '@angular/core';
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-deck-flashcards',
  templateUrl: './deck-flashcards.component.html',
  styleUrl: './deck-flashcards.component.css'
})
export class DeckFlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  deckId : string | null =''
  constructor(
    private flashcardService: FlashcardServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeFlipCards();
    this.route.paramMap.subscribe(params => {
      this.deckId = params.get('id');
      if (this.deckId) {
        this.fetchFlashcards(this.deckId); // Fetch flashcards based on deckId
      }
    });
  }

  initializeFlipCards(): void {
    const flipCards = document.querySelectorAll(".flip-card-click");

    flipCards.forEach((card) => {
      card.addEventListener("click", function () {
        card.classList.toggle("flipped");
      });
    });
  }

  fetchFlashcards(deckId: string) {
    this.flashcardService.getAllFlashcards().then(
      (data: any) => {
        this.flashcards = data.data;
        console.log(this.flashcards);
        
        this.flashcards = this.flashcards.filter(card => card.deckId.toString() === deckId)
        console.log(this.flashcards);
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
        if (this.deckId){
          this.fetchFlashcards(this.deckId);
        }
        
      },
      (error) => {
        // Handle error
        console.error("Failed to delete Flashcard :", error);
      }
    );
  }
}
