import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeckService } from '../../services/auth/deck.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FlashcardServiceService } from '../../services/flashcard/flashcard-service.service';

@Component({
  selector: 'app-create-flashcard',
  templateUrl: './create-flashcard.component.html',
  styleUrl: './create-flashcard.component.css'
})
export class CreateFlashcardComponent {

  constructor(
    private deckService : DeckService,
    private snackBar : MatSnackBar,
    private router: Router
  ){}

  deckForm = new FormGroup({
    tags: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z0-9\s,]*$/)
    ]),
    frontText: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
    backText: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
    visibility: new FormControl("", [
      Validators.required,
    ]),
    deckName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
    ]),
  });

  inputFocus: { [key: string]: boolean } = {
    tags: false,
    frontText: false,
    backText: false,
    visibility: false,
    deckName: false
  };

  onFocus(controlName: string) {
    this.inputFocus[controlName] = true;
  }

  onBlur(controlName: string) {
    this.inputFocus[controlName] = false;
  }

  onSubmit(){}

}
