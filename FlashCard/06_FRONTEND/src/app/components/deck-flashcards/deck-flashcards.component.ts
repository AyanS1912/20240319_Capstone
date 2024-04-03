import { Component, OnInit } from "@angular/core";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterService } from "../../services/auth/user.service";
import { VoteService } from "../../services/vote/vote.service";

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
    private voteService: VoteService
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

  upvoteFlashcard(flashcardId: string): void {
    // Call the upvoteFlashcard() API method
    this.voteService.upvoteFlashcard(flashcardId).then(
      (res) => {
        console.log("Flashcard upvoted successfully:", res);
        // Reload flashcards after upvote
        if(this.deckId)
          this.fetchFlashcards(this.deckId);
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
        if(this.deckId)
          this.fetchFlashcards(this.deckId);
      },
      (error) => {
        console.error("Failed to downvote Flashcard:", error);
      }
    );
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
        if (this.deckId) {
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
