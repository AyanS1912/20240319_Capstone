// edit-decks.component.ts
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DeckService } from "../../services/auth/deck.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-deck",
  templateUrl: "./edit-deck.component.html",
  styleUrls: ["./edit-deck.component.css"],
})
export class EditDeckComponent implements OnInit {
  deckId: string = "";
  deckData: any;

  // decks: Deck[] = [];
  // deckForm: FormGroup;

  constructor(
    private deckService: DeckService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  // Initialize deckForm with form controls and validators
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
    visibility: new FormControl("", [Validators.required]),
  });

   // Track input focus states
  nameInputFocused: boolean = false;
  descInputFocused: boolean = false;

  // Method to handle input focus
  onFocus(controlName: string) {
    if (controlName === "name") {
      this.nameInputFocused = true;
    } else if (controlName === "description") {
      this.descInputFocused = true;
    }
  }

  // Method to handle input blur
  onBlur(controlName: string) {
    if (controlName === "name") {
      this.nameInputFocused = false;
    } else if (controlName === "description") {
      this.descInputFocused = false;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.deckId = params["id"];
      this.loadDeckData();
    });
  }

   // Method to load deck data for editing
  loadDeckData() {
    this.deckService.getDecks(this.deckId).then(
      (data) => {
        this.deckData = data.data;
        // console.log(this.deckData)
        this.populateForm();
      },
      (error) => {
        console.error("Failed to fetch deck data:", error);
        this.snackBar.open("Failed to fetch deck data. Please try again.", "", {
          duration: 3000,
        });
      }
    );
  }

  // Method to populate form with loaded deck data
  populateForm() {
    this.deckForm.patchValue({
      name: this.deckData.name,
      description: this.deckData.description,
      visibility: this.deckData.visibility,
    });
  }

  // Method to handle form submission for updating deck
  onSubmit() {
    if (this.deckForm.invalid) {
      return;
    }

    const updatedDeckData = this.deckForm.value;
    this.deckService.updateDeck(this.deckId, updatedDeckData).then(
      (response) => {
        console.log("Deck updated successfully:", response);
        this.snackBar.open("Deck updated successfully", "", { duration: 3000 });
        this.router.navigate(["/home"]); // Navigate to home page after successful update
      },
      (error) => {
        console.error("Failed to update deck:", error);
        this.snackBar.open("Failed to update deck. Please try again.", "", {
          duration: 3000,
        });
      }
    );
  }
}
