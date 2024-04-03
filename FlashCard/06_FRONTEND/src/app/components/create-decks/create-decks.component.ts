import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DeckService } from "../../services/auth/deck.service";
// import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-create-decks',
  templateUrl: './create-decks.component.html',
  styleUrl: './create-decks.component.css'
})
export class CreateDecksComponent {
  constructor(
    private deckService : DeckService,
    private snackBar : MatSnackBar,
    private router: Router
  ){}

  // Define FormGroup to manage form controls and their validations
  deckForm = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
      Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
    ]),
    visibility: new FormControl("", [
      Validators.required,
    ]),
  });

  // Properties to track focus state of input fields
  nameInputFocused: boolean = false;
  descInputFocused: boolean = false;

   // Method to handle input focus event
  onFocus(controlName: string) {
    if (controlName === "name") {
      this.nameInputFocused = true;
    } else if (controlName === "description") {
      this.descInputFocused = true;
    }
  }

  // Method to handle form submission
  onBlur(controlName: string) {
    if (controlName === "name") {
      this.nameInputFocused = false;
    } else if (controlName === "description") {
      this.descInputFocused = false;
    }
  }


  onSubmit() {
    if (this.deckForm.invalid) {
      return; // If form is invalid, do not proceed
    }

    // Extract form data
    const deckData = this.deckForm.value;

    // Call deck service to create deck
    this.deckService.createDeck(deckData).then(
      (response) => {
        console.log('Deck created successfully:', response);
        this.snackBar.open('Deck created successfully', '', { duration: 3000 });
        this.router.navigate(['/home']); // Navigate to home page after successful creation
      },
      (error) => {
        console.error('Failed to create deck:', error);
        this.snackBar.open('Failed to create deck. Please try again.', '', { duration: 3000 });
      }
    );
  }
}
