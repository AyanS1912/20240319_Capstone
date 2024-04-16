import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterService } from "../../services/auth/user.service";
import { VoteService } from "../../services/vote/vote.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { FlashcardVote } from "../../interface/flashcardvote";
import { DeckService } from "../../services/deck/deck.service";
import { SharedService } from "../../services/shared/shared.service";


@Component({
  selector: "app-deck-flashcards",
  templateUrl: "./deck-flashcards.component.html",
  styleUrl: "./deck-flashcards.component.css",
})
export class DeckFlashcardsComponent implements OnInit {
  myflashcards: Flashcard[] = [];
  deckId: string | null = "";
  userDetails: any;
  userId : any;
  deckTitle: string = "";

  constructor(
    private flashcardService: FlashcardServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: RegisterService,
    private voteService: VoteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private deckService: DeckService,
    private sharedService : SharedService
    
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get("id");
      if (this.deckId) {
        this.loaddecks(this.deckId);
        this.fetchdecksFlashcards(this.deckId);
      }
    });
    
    this.initializeFlipCards();
  }

  loaddecks(deckId: string) {
    this.deckService.getDecks(deckId).then(
      (data: any) => {
        this.deckTitle = data.data.name;
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
      }
    );
  }
  // Method to fetch user details
  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userDetails = data;
        this.userId = this.userDetails._id
        console.log(this.userId)
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
  fetchdecksFlashcards(deckId: string) {
    this.flashcardService.getAllFlashcards().then(
      (data: any) => {
        this.myflashcards = data.data;        
        this.myflashcards = this.myflashcards.filter(
          (card) => {
            // If the user owns the flashcard, include 
            if (card.userId.toString() === this.userId) {

              return card.deckId.toString() === deckId;
            } else {
              // If the user doesn't own the flashcard, include only if it's public
              return card.deckId.toString() === deckId && card.visibility === 'public';
            }
          }
        );
        // console.log("Mine", this.myflashcards);
        this.fetchUserVotes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  recallCard() {
    if (this.deckId) {
      this.fetchdecksFlashcards(this.deckId);
    }
  }

  fetchUserVotes(): void {
    for (const flashcard of this.myflashcards) {
      this.voteService.getVotesForFlashcard(flashcard._id).then(
        (votes: FlashcardVote[]) => {
          const userVote = votes.find(
            (vote) => vote.userId === this.userDetails._id
          );
          if (userVote) {
            flashcard.userVoteType = userVote.voteType;
          } else {
            flashcard.userVoteType = "";
          }
          console.log(flashcard.userVoteType)
          flashcard.upvotes = votes.filter(
            (vote) => vote.voteType === "upvote"
          ).length;
          flashcard.downvotes = votes.filter(
            (vote) => vote.voteType === "downvote"
          ).length;
        },
        (error) => {
          console.error("Failed to fetch votes for flashcard:", error);
        }
      );
    }
  }

  createCard(): void {
    console.log("call hua toh deck-flash poe")
    this.sharedService.createCard = true
    this.router.navigate(['/home'])
    console.log(this.sharedService.createCard)
  }
}
