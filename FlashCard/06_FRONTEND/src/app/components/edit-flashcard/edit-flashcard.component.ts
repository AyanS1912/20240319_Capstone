import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FlashcardServiceService } from "../../services/flashcard/flashcard-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Flashcard } from "../../interface/flashcardInterface";
import { Deck } from "../../interface/deckInterface";
import { DeckService } from "../../services/deck/deck.service";

@Component({
  selector: "app-edit-flashcard",
  templateUrl: "./edit-flashcard.component.html",
  styleUrls: ["./edit-flashcard.component.css"],
})
export class EditFlashcardComponent implements OnInit {
  flashcardId: string = "";
  flashcardData: any = {};
  decks: Deck[] = [];

  frontText : string ='';
  backText : string = ''

  constructor(
    private flashcardService: FlashcardServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private deckService: DeckService
  ) {}

  // Initialize flashcardForm with form controls and validators
  // flashcardForm = new FormGroup({
  //   tags: new FormControl("", [
  //     Validators.required,
  //     Validators.minLength(1),
  //     Validators.maxLength(10),
  //     Validators.pattern(/^[a-zA-Z0-9\s,]*$/),
  //   ]),
  //   frontText: new FormControl("", [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(200),
  //   ]),
  //   backText: new FormControl("", [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(500),
  //   ]),
  //   visibility: new FormControl("", [Validators.required]),
  //   deckName: new FormControl("", [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(50),
  //     Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
  //   ]),
  // });
  ngOnInit(): void {
    this.flashcardId = this.route.snapshot.params["id"];
    this.loadFlashcardData();
  }

  // Method to load flashcard data for editing
  loadFlashcardData() {
    this.flashcardService.getFlashcardById(this.flashcardId).then(
      (data: any) => {
        this.flashcardData = data.data;
        // this.populateForm(this.flashcardData);
        console.log("Data",this.flashcardData);
        this.backText = this.flashcardData.backText
        this.frontText = this.flashcardData.frontText
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

  // Method to load decks for dropdown selection
  loadDecks() {
    this.deckService.getAllDecks().then(
      (data: any) => {
        this.decks = data.data;
        this.decks = this.decks.filter(
          (deck: Deck) =>
            deck.userId.toString() === this.flashcardData.userId.toString()
        );
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
      }
    );
  }

  // Method to handle form submission for updating flashcard
  onEditSubmit(formData : any) {
    console.log("clicked")
    this.flashcardService
      .updateFlashcard(this.flashcardId, formData )
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
