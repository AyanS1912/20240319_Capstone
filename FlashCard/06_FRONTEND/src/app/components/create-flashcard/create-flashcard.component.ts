import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeckService } from "../../services/deck/deck.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { Deck } from "../../interface/deckInterface";
import { RegisterService } from "../../services/auth/user.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";



@Component({
  selector: "app-create-flashcard",
  templateUrl: "./create-flashcard.component.html",
  styleUrl: "./create-flashcard.component.css",
})
export class CreateFlashcardComponent {
  frontText: string = "Please Enter the Front Text......";
  backText: string = "Please Enter the Back Text......";
  userId: string = "";
  flashcardId: string = "";

  decks: Deck[] = [];
  constructor(
    private flashcardService: FlashcardServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  // Method to handle form submission
  onCreateSubmit(formData: any): void {
    if (formData) {
      // console.log(this.frontText, this.backText);
      // Check if deckId is provided and is a non-empty string
      if (formData.deckId) {
        console.log(formData);

        this.flashcardService
          .createFlashcard(formData.deckId, formData)
          .then((response: any) => {
            // this.snackBar.open("Flashcard created successfully", "", {
            //   duration: 3000,
            // });

            this.router.navigate(["/home"]); // Navigate to home page after successful creation
          })
          .catch((error: any) => {
            console.error("Error creating flashcard:", error);
            this.snackBar.open(
              "Failed to create flashcard. Please try again.",
              "",
              { duration: 3000 }
            );
          });
      } else {
        // Handle case where deckId is not provided or invalid
        this.snackBar.open("Please select a valid deck.", "", {
          duration: 3000,
        });
      }
    } else {
      // Form is invalid, display error message or handle as needed
      this.snackBar.open("Please fill out all required fields correctly.", "", {
        duration: 3000,
      });
    }
  }
}
