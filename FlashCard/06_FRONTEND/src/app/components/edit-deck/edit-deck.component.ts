// edit-decks.component.ts
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DeckService } from "../../services/deck/deck.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-deck",
  templateUrl: "./edit-deck.component.html",
  styleUrls: ["./edit-deck.component.css"],
})
export class EditDeckComponent implements OnInit {
  deckId: string = "";
  deckData: any;

  constructor(
    private deckService: DeckService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  

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
        console.log(this.deckData,"Data")
      },
      (error) => {
        console.error("Failed to fetch deck data:", error);
        this.snackBar.open("Failed to fetch deck data. Please try again.", "", {
          duration: 3000,
        });
      }
    );
  }

  // Method to handle form submission for updating deck
  onSubmit(formData: any) {
    this.deckService.updateDeck(this.deckId, formData).then(
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
