import { Component, OnInit , Input} from "@angular/core";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Flashcard } from "../../interface/flashcardInterface";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterService } from "../../services/auth/user.service";
import { VoteService } from "../../services/vote/vote.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { FlashcardVote } from "../../interface/flashcardvote";
import { DeckService } from "../../services/auth/deck.service";

@Component({
  selector: "app-deck-flashcards",
  templateUrl: "./deck-flashcards.component.html",
  styleUrl: "./deck-flashcards.component.css",
})
export class DeckFlashcardsComponent implements OnInit {
  @Input() flashcards: Flashcard[] = [];
  deckId: string | null = "";
  userDetails: any;
  deckTitle : string = ''
  constructor(
    private flashcardService: FlashcardServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: RegisterService,
    private voteService: VoteService,
    private snackBar: MatSnackBar,
    private dialog : MatDialog,
    private deckService : DeckService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.initializeFlipCards();
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get("id");
      if (this.deckId) {
        this.fetchFlashcards(this.deckId); // Fetch flashcards based on deckId
        this.loaddecks(this.deckId)
      }
    });
  }

  loaddecks(deckId : string){
    this.deckService.getDecks(deckId) .then(
      (data: any) => {
        this.deckTitle = data.data.name;
        console.log(this.deckTitle);
        

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
        this.fetchUserVotes()
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchUserVotes(): void {
    for (const flashcard of this.flashcards) {
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

}
