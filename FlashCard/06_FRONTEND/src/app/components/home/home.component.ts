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
  // userDetails: any;

  constructor(
    private deckService: DeckService,
    private userService: RegisterService,
    private router: Router,
    private voteService : VoteService
  ) {}

  ngOnInit(): void {
    // this.getUserDetails();
    this.loadDecks();
  }

  loadDecks() {
    this.deckService.getAllDecks().then(
      (decks: any) => {
        this.deckCardDecks = decks.data;
        console.log(this.deckCardDecks);
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
      }
    );
  }

  handleSearchResults(results: any[]): void {
    this.deckCardDecks = results;
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
