import { Component , Input, OnInit} from '@angular/core';
import { Deck } from '../../interface/deckInterface';
import { DeckService } from '../../services/auth/deck.service';
import { RegisterService } from '../../services/auth/user.service';
import { Router } from '@angular/router';
import { VoteService } from '../../services/vote/vote.service';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrl: './deck-card.component.css'
})
export class DeckCardComponent implements OnInit {

  @Input() decks: Deck[] = [];
  @Input() userDetails : any;

  upvotes: number = 0;
  downvotes: number = 0;
  userVote: string = '';

  constructor( private deckService : DeckService,
    private userService : RegisterService,
    private router: Router,
    private voteService : VoteService
    ) {}
  
  ngOnInit(): void {
    this.getUserDetails();
    // this.getUserVoteStatus();
    // this.getVotesCount();
  }

  // getUserVoteStatus() {
  //   // Get the user's vote status for the current deck
  //   this.voteService.getVotesForDeck(this.deck._id)
  //     .then((votesData) => {
  //       // Check if user's ID exists in the votes data
  //       const userVote = votesData.find(vote => vote.userId === this.userService.getCurrentUserId());
  //       if (userVote) {
  //         // User has voted, set the user's vote status
  //         this.userVote = userVote.voteType;
  //       } else {
  //         // User has not voted
  //         this.userVote = '';
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Failed to get user vote status:', error);
  //     });
  // }

  // getVotesCount() {
  //   // Get the votes count for the current deck
  //   this.voteService.getVotesForDeck(this.deck._id)
  //     .then((votesData) => {
  //       // Calculate upvotes and downvotes count
  //       this.upvotes = votesData.filter(vote => vote.voteType === 'upvote').length;
  //       this.downvotes = votesData.filter(vote => vote.voteType === 'downvote').length;
  //     })
  //     .catch((error) => {
  //       console.error('Failed to get votes count:', error);
  //     });
  // }

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

  editDeck(deckId: string) {
    this.router.navigate(['/edit-deck', deckId]);
  }

  deleteDeck(deckId: string) {
    // Call the deleteDeck() API method
    console.log("Delete button clicked for deck ID:", deckId);
    
    this.deckService.deleteDeck(deckId).then(
      (res) => {
        // Handle success
        console.log('Deck deleted successfully:', res);
        // Reload decks after deletion
        // this.loadDecks();
      },
      (error) => {
        // Handle error
        console.error('Failed to delete deck:', error);
      }
    );
  }

  showFlashcards(deckId: string) {
    // Navigate to the component that displays flashcards for the selected deck
    this.router.navigate(['/deck-flashcards', deckId]);
  }

  upvoteDeck(deckId: string): void {
    this.voteService.upvoteDeck(deckId)
      .then((data) => {
        // Update the deck's upvote count
        console.log(data)

      })
      .catch((error) => {
        console.error('Failed to upvote deck:', error);
      });
  }

  

  downvoteDeck(deckId: string): void {
    this.voteService.downvoteDeck(deckId)
      .then((data) => {
        // Update the deck's downvote count
        console.log(data)

      })
      .catch((error) => {
        console.error('Failed to downvote deck:', error);
      });
  }

}
