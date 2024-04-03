import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DeckService } from "../../services/auth/deck.service";
import { Deck } from "../../interface/deckInterface";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-myprofile",
  templateUrl: "./myprofile.component.html",
  styleUrl: "./myprofile.component.css",
})
export class MyprofileComponent implements OnInit {
  userDetails: any;
  userDecks: Deck[] = [];
  showEditForm: boolean = false;
  editedUser: any = {};

  constructor(
    private userService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
    private deckService: DeckService,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Confirm user account deletion
  confirmDelete(userId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete your account?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion
        this.deleteUser(userId);
      }
    });
  }

  // Fetch user details
  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userDetails = data;
        console.log(this.userDetails);
        this.getUserDecks();
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
      }
    );
  }

  // Fetch user's decks
  getUserDecks() {
    // Use DeckService to fetch user's decks
    this.deckService.getAllDecks().then(
      (decks: any) => {
        this.userDecks = decks.data;
        this.userDecks = this.userDecks.filter(
          (deck) => deck.userId.toString() === this.userDetails._id.toString()
        );
        console.log(this.userDecks);
      },
      (error) => {
        console.error("Failed to fetch user's decks:", error);
      }
    );
  }

  // Open edit form for user details
  openEditForm() {
    this.showEditForm = !this.showEditForm;
    this.editedUser = { ...this.userDetails };
  }

  // Update user details
  updateUserDetails() {
    this.userService.updateUser(this.userDetails._id, this.editedUser).then(
      (res) => {
        this.snackBar.open("User details updated successfully", "", {
          duration: 3000,
        });
        this.showEditForm = false;
        this.getUserDetails();
      },
      (error) => {
        console.error("Failed to update user details:", error);
      }
    );
  }

  // Delete user account
  deleteUser(userId: string) {
    console.log("Clicked");
    this.userService.deleteUser(userId).then(
      () => {
        this.snackBar.open("User deleted successfully", "", { duration: 5000 });
        this.router.navigate(["/login"]);
      },
      (error: any) => {
        console.error("Failed to delete user:", error);
      }
    );
  }

  // Edit a deck
  editDeck(deckId: string) {
    this.router.navigate(["/edit-deck", deckId]);
  }

  // Delete a deck
  deleteDeck(deckId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete this deck?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion
        // Call the deleteDeck() API method
        console.log("Delete button clicked for deck ID:", deckId);

        this.deckService.deleteDeck(deckId).then(
          (res) => {
            // Handle success
            console.log("Deck deleted successfully:", res);
            // Reload decks after deletion
            this.getUserDecks();
          },
          (error) => {
            // Handle error
            console.error("Failed to delete deck:", error);
          }
        );
      }
    });
  }
}
