import { Component , Input, OnInit} from '@angular/core';
import { Deck } from '../../interface/deckInterface';
import { DeckService } from '../../services/auth/deck.service';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrl: './deck-card.component.css'
})
export class DeckCardComponent implements OnInit {
  // @Input() deck!: Deck;
  decks: Deck[] = []; 
  mydecks : Deck[] = []

  constructor( private deckService : DeckService) {}
  
  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks() {
    this.deckService.getAllDecks().then(
      (decks : any) => {
        this.decks = decks.data;
      },
      (error) => {
        console.error('Failed to fetch decks:', error);
      }
    );
  }
}
