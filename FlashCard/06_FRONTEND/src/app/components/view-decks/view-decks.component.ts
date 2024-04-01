import { Component , Input, OnInit} from '@angular/core';
import { Deck } from '../../interface/deckInterface';
import { DeckService } from '../../services/auth/deck.service';
import { RegisterService } from '../../services/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-decks',
  templateUrl: './view-decks.component.html',
  styleUrl: './view-decks.component.css'
})
export class ViewDecksComponent {
   // @Input() deck!: Deck;
   mydeckCardDecks : Deck[] = []
   userDetails :any
 
   constructor(
    private deckService: DeckService,
    private userService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    
  }

  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userDetails = data;
        this.loadDecks();
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
      }
    );
  }

  loadDecks() {
    this.deckService.getAllDecks().then(
      (decks: any) => {
        this.mydeckCardDecks = decks.data;
        this.mydeckCardDecks = this.mydeckCardDecks.filter(deck => deck.userId.toString() === this.userDetails._id.toString())
        console.log(this.mydeckCardDecks)
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
      }
    );
  }

  


}
