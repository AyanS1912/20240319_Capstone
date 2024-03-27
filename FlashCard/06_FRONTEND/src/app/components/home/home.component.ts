import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DeckService } from '../../services/auth/deck.service';
import { Deck } from '../../interface/deckInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  selectedComponent: string = 'deck-card'; 
  isProfileOpen: boolean = false;
  decks: Deck[] = [];

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.loadDecks();
  }

  onButtonClicked(component: string) {
    this.isProfileOpen = false
    this.selectedComponent = component;
    // console.log(this.selectedComponent);
  }

  openMyProfile(open: boolean): void {
    // console.log("Profile Clocked");
    this.isProfileOpen = open;
    this.selectedComponent =''
  }

  loadDecks() {
    this.deckService.getAllDecks().then(
      (decks : Deck[]) => {
        this.decks = decks;
        // console.log(this.decks)
      },
      (error) => {
        console.error('Failed to fetch decks:', error);
      }
    );
  }
}
