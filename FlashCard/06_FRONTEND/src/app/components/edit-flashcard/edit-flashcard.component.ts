import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Flashcard } from "../../interface/flashcardInterface";
import { Deck } from "../../interface/deckInterface";
import { DeckService } from "../../services/auth/deck.service";

@Component({
  selector: "app-edit-flashcard",
  templateUrl: "./edit-flashcard.component.html",
  styleUrls: ["./edit-flashcard.component.css"],
})
export class EditFlashcardComponent implements OnInit {
  flashcardId: string = "";
  flashcardData: any = {};
  decks: Deck[] = [];

  constructor(
    private flashcardService: FlashcardServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private deckService: DeckService
  ) {}

  flashcardForm = new FormGroup({
    tags: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z0-9\s,]*$/),
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
    visibility: new FormControl("", [Validators.required]),
    deckName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
    ]),
  });
  ngOnInit(): void {
    this.flashcardId = this.route.snapshot.params["id"];
    this.loadFlashcardData();
  }

  inputFocus: { [key: string]: boolean } = {
    tags: false,
    frontText: false,
    backText: false,
    visibility: false,
    deckName: false,
  };

  onFocus(controlName: string) {
    this.inputFocus[controlName] = true;
  }

  onBlur(controlName: string) {
    this.inputFocus[controlName] = false;
  }
  loadFlashcardData() {
    this.flashcardService.getFlashcardById(this.flashcardId).then(
      (data: any) => {
        this.flashcardData = data.data;
        this.populateForm(this.flashcardData);
        console.log(this.flashcardData);
        // console.log(this.flashcardData.id);

        this.loadDecks();
      },
      (error) => {
        console.error("Failed to fetch flashcard data:", error);
        this.snackBar.open(
          "Failed to fetch flashcard data. Please try again.",
          "",
          { duration: 3000 }
        );
      }
    );
  }

  populateForm(flashcardData: Flashcard) {
    this.flashcardForm.patchValue({
      tags: flashcardData.tags.join(", "),
      frontText: flashcardData.frontText,
      backText: flashcardData.backText,
      visibility: flashcardData.visibility,
      deckName: flashcardData.deckId, // Assuming deckId is the correct field name
    });
  }

  loadDecks() {
    this.deckService.getAllDecks().then(
      (data: any) => {
        this.decks = data.data;
        this.decks = this.decks.filter(
          (deck: Deck) =>
            deck.userId.toString() === this.flashcardData.userId.toString()
        );
        console.log(this.decks);
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
      }
    );
  }

  onSubmit() {
    const updatedFlashcardData = {
      tags: this.flashcardForm.value.tags
        ?.split(",")
        .map((tag: string) => tag.trim()), // Split tags by comma and trim whitespace
      frontText: this.flashcardForm.value.frontText,
      backText: this.flashcardForm.value.backText,
      visibility: this.flashcardForm.value.visibility,
      deckId: this.flashcardForm.value.deckName,
    };
    this.flashcardService
      .updateFlashcard(this.flashcardId, updatedFlashcardData)
      .then(
        (response) => {
          console.log("Flashcard updated successfully:", response);
          this.snackBar.open("Flashcard updated successfully", "", {
            duration: 3000,
          });
          this.router.navigate(["/home"]); // Navigate to home page after successful update
        },
        (error) => {
          console.error("Failed to update flashcard:", error);
          this.snackBar.open(
            "Failed to update flashcard. Please try again.",
            "",
            { duration: 3000 }
          );
        }
      );
  }
}
