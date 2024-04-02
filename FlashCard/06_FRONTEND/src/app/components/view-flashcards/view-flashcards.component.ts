import { Component, OnInit } from "@angular/core";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";
import { RegisterService } from "../../services/auth/user.service";

@Component({
  selector: "app-view-flashcards",
  templateUrl: "./view-flashcards.component.html",
  styleUrl: "./view-flashcards.component.css",
})
export class ViewFlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  userDetails : any;

  constructor(
    private flashcardService: FlashcardServiceService,
    private router: Router,
    private voteService : VoteService,
    private userService : RegisterService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.initializeFlipCards();
    this.fetchFlashcards();
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

  fetchFlashcards() {
    this.flashcardService.getAllFlashcards().then(
      (data: any) => {
        this.flashcards = data.data;
        this.fetchUserVotes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchUserVotes(): void {
    for (const flashcard of this.flashcards) {
      this.voteService.getVotesForFlashcard(flashcard._id).then(
        (votes: any[]) => {
          const userVote = votes.find((vote) => vote.userId === this.userDetails._id);
          if (userVote) {
            flashcard.userVoteType = userVote.voteType;
          } else {
            flashcard.userVoteType = "";
          }
          flashcard.upvotes = votes.filter((vote) => vote.voteType === "upvote").length;
          flashcard.downvotes = votes.filter((vote) => vote.voteType === "downvote").length;
        },
        (error) => {
          console.error("Failed to fetch votes for flashcard:", error);
        }
      );
    }
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
