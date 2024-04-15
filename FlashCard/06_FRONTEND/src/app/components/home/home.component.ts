import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Deck } from "../../interface/deckInterface";
import { DeckService } from "../../services/deck/deck.service";
import { RegisterService } from "../../services/auth/user.service";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  selectedComponent: string = "";
  isProfileOpen: boolean = false;
  deckCardDecks: Deck[] = [];

  upvotes: number = 0;
  downvotes: number = 0;
  userVote: string = "";
  userData: any;

  constructor(
    private deckService: DeckService,
    private userService: RegisterService,
    private router: Router,
    private voteService: VoteService,
    private snackBar: MatSnackBar
  ) {
    console.log(this.selectedComponent)
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.loadDecks();
    this.selectedComponent = "deck-card";
  }

  // Fetch user details
  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userData = data;
        // console.log(this.userDetails)
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
        this.snackBar.open(
          "Failed to fetch user details. Please try again.",
          "",
          { duration: 3000 }
        );
      }
    );
  }

  // Load decks for display
  loadDecks() {
    this.deckService.getAllDecks().then(
      (decks: any) => {
        this.deckCardDecks = decks.data;
        console.log(this.deckCardDecks);
        this.fetchUserVotes();
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
        this.snackBar.open("Failed to fetch decks. Please try again.", "", {
          duration: 3000,
        });
      }
    );
  }

  // Fetch user votes for decks
  fetchUserVotes(): void {
    console.log(this.deckCardDecks);
    for (const deck of this.deckCardDecks) {
      this.voteService
        .getVotesForDeck(deck._id)
        .then((votes: any[]) => {
          const userVote = votes.find(
            (vote) => vote.userId === this.userData._id
          );
          if (userVote) {
            deck.userVoteType = userVote.voteType;
          } else {
            deck.userVoteType = "";
          }
          deck.upvotes = votes.filter(
            (vote) => vote.voteType === "upvote"
          ).length;
          deck.downvotes = votes.filter(
            (vote) => vote.voteType === "downvote"
          ).length;
        })
        .catch((error) => {
          console.error("Failed to fetch votes for deck:", error);
          this.snackBar.open(
            "Failed to fetch votes for deck. Please try again.",
            "",
            { duration: 3000 }
          );
        });
    }
  }

  // Reload decks
  reloadDecks() {
    this.loadDecks();
  }

  // Handle search results
  handleSearchResults(results: any[]): void {
    this.selectedComponent = "deck-card";
    this.deckCardDecks = results;
    this.fetchUserVotes();
  }

  // Handle button clicks
  onButtonClicked(component: string) {
    this.isProfileOpen = false;
    this.selectedComponent = component;
    // console.log(this.selectedComponent);
  }

  onCreateFlashcardClicked() {
    this.selectedComponent = "create-flashcard";
    this.isProfileOpen = false;
  }
  
  onSearchClicked(): void {
    this.selectedComponent = "deck-card";
  }

  // Open user profile
  openMyProfile(open: boolean): void {
    if (open) {
      this.selectedComponent = "";
    }
    this.isProfileOpen = open;
  }
}
