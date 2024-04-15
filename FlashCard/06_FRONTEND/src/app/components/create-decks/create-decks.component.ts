import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DeckService } from "../../services/deck/deck.service";
// import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-create-decks",
  templateUrl: "./create-decks.component.html",
  styleUrl: "./create-decks.component.css",
})
export class CreateDecksComponent {
  constructor(
    private deckService: DeckService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit(formData: any) {
    this.deckService.createDeck(formData).then(
      (response) => {
        console.log("Deck created successfully:", response);
        this.snackBar.open("Deck created successfully", "", { duration: 3000 });
        this.router.navigate(["/home"]); // Navigate to home page after successful creation
      },
      (error) => {
        console.error("Failed to create deck:", error);
        this.snackBar.open("Failed to create deck. Please try again.", "", {
          duration: 3000,
        });
      }
    );
  }
}
