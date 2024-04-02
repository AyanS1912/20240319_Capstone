import { Component, Input ,Output, EventEmitter, OnInit } from "@angular/core";
import { Deck } from "../../interface/deckInterface";
import { DeckService } from "../../services/auth/deck.service";
import { RegisterService } from "../../services/auth/user.service";
import { Router } from "@angular/router";
import { VoteService } from '../../services/vote/vote.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  selectedComponent: string = "deck-card";
  isProfileOpen: boolean = false;
  deckCardDecks: Deck[] = [];

  upvotes: number = 0;
  downvotes: number = 0;
  userVote: string = '';
  userData: any;

  constructor(
    private deckService: DeckService,
    private userService: RegisterService,
    private router: Router,
    private voteService : VoteService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.loadDecks();
  }

  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userData = data;
        // console.log(this.userDetails)
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
      }
    );
  }

  loadDecks() {
    this.deckService.getAllDecks().then(
      (decks: any) => {
        this.deckCardDecks = decks.data;
        console.log(this.deckCardDecks);
        this.fetchUserVotes()
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
      }
    );
  }

  fetchUserVotes(): void {
    console.log(this.deckCardDecks)
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
          console.log("Votes fetched successfully for deck:", deck._id);
          console.log("User vote type:", deck.userVoteType);
          console.log("Total upvotes:", deck.upvotes);
          console.log("Total downvotes:", deck.downvotes);
        })
        .catch((error) => {
          console.error("Failed to fetch votes for deck:", error);
        });
    }
  }
  
  reloadDecks() {
    this.loadDecks();
  }
  
  handleSearchResults(results: any[]): void {
    this.deckCardDecks = results;
    this.selectedComponent = 'deck-card'
    this.fetchUserVotes()
  }

  onButtonClicked(component: string) {
    this.isProfileOpen = false;
    this.selectedComponent = component;
    // console.log(this.selectedComponent);
  }

  openMyProfile(open: boolean): void {
    // console.log("Profile Clocked");
    this.isProfileOpen = open;
    this.selectedComponent = "";
  }
}
