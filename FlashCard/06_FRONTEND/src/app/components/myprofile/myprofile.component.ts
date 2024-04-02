import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DeckService } from "../../services/auth/deck.service"; 
import { Deck } from "../../interface/deckInterface";

@Component({
  selector: "app-myprofile",
  templateUrl: "./myprofile.component.html",
  styleUrl: "./myprofile.component.css",
})
export class MyprofileComponent implements OnInit {
  userDetails: any;
  userDecks: Deck[] = [];

  constructor(
    private userService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
    private deckService: DeckService,
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  confirmDelete(userId : string) {
    if (window.confirm("Are you sure you want to delete your account?")) {
      this.deleteUser(userId);
    }
  }
  
  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userDetails = data;
        console.log(this.userDetails)
        this.getUserDecks();
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
      }
    );
  }

  getUserDecks() {
    // Use DeckService to fetch user's decks
    this.deckService.getAllDecks().then(
      (decks: any) => {
        this.userDecks = decks.data;
        this.userDecks =this.userDecks.filter(deck => deck.userId.toString() === this.userDetails._id.toString())
        console.log(this.userDecks)
      },
      (error) => {
        console.error("Failed to fetch user's decks:", error);
      }
    );
  }

  deleteUser(userId : string) {
    console.log("Clicked")
    this.userService.deleteUser(userId).then(
      () => {
        this.snackBar.open('User deleted successfully', '', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Failed to delete user:', error);
      }
    );
  }

  editDeck(deckId: string) {
    this.router.navigate(["/edit-deck", deckId]);
  }

  deleteDeck(deckId: string) {
    // Call the deleteDeck() API method
    console.log("Delete button clicked for deck ID:", deckId);

    this.deckService.deleteDeck(deckId).then(
      (res) => {
        // Handle success
        console.log("Deck deleted successfully:", res);
        // Reload decks after deletion
        // this.loadDecks();
      },
      (error) => {
        // Handle error
        console.error("Failed to delete deck:", error);
      }
    );
  }
}
