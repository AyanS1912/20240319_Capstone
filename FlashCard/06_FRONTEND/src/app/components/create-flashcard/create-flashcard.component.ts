import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeckService } from "../../services/auth/deck.service";
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
  frontContent: string = "";
  userId: string = "";
  flashcardId: string = "";

  decks: Deck[] = [];
  constructor(
    private userService: RegisterService,
    private flashcardService: FlashcardServiceService,
    private deckService: DeckService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    // Fetch user's details and decks when component initializes
    this.getUserDetails();
  }

  format = "html";
  // quillForm;
  quillConfig = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"], // remove formatting button
        ["link"],
        ["source"],
      ],
      handlers: {
        source: () => {
          // this.formatChange();
        },
      },
    },
  };

  // FormGroup to manage form controls and their validations
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

  // Object to track focus state of input fields
  inputFocus: { [key: string]: boolean } = {
    tags: false,
    frontText: false,
    backText: false,
    visibility: false,
    deckName: false,
  };

  // Method to handle input focus event
  onFocus(controlName: string) {
    this.inputFocus[controlName] = true;
  }

  // Method to handle input blur event
  onBlur(controlName: string) {
    this.inputFocus[controlName] = false;
  }

  // Method to fetch user details
  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userId = data._id;
        // console.log(this.userId);
        this.loadDecks();
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
      }
    );
  }
  // Method to load decks associated with the user
  loadDecks() {
    this.deckService.getAllDecks().then(
      (data: any) => {
        this.decks = data.data;
        // console.log("1",this.decks)

        this.decks = this.decks.filter(
          (deck: Deck) => deck.userId.toString() === this.userId.toString()
        );
        // console.log("2",this.decks)
      },
      (error) => {
        console.error("Failed to fetch decks:", error);
      }
    );
  }

  // Method to insert Markdown into textarea
  insertMarkdown(prefix: string, helperText: string, suffix: string) {
    const textareaEl = document.querySelector("textarea");

    if (textareaEl) {
      const textarea = textareaEl as HTMLTextAreaElement;
      // Start represents the index of textarea before selection
      const start = textarea.selectionStart;
      // End represents the index of textarea after selection
      const end = textarea.selectionEnd;

      const selectedText = this.frontContent.substring(start, end);

      // If some text is selected, ignore helper
      if (selectedText) {
        const newText = `${prefix}${selectedText}${suffix}`;
        this.frontContent =
          this.frontContent.substring(0, start) +
          newText +
          this.frontContent.substring(end);
      }
      // Else add Helper
      else {
        this.frontContent =
          this.frontContent.substring(0, start) +
          prefix +
          helperText +
          suffix +
          this.frontContent.substring(end);
      }

      textarea.selectionStart = textarea.selectionEnd = start + prefix.length;
      textarea.focus();
    }
  }
  // Method to handle form submission
  onSubmit(): void {
    if (this.flashcardForm) {
      // Form is valid, continue with flashcard creation
      const flashcardData = {
        tags: this.flashcardForm.value.tags
          ?.split(",")
          .map((tag: string) => tag.trim()), // Split tags by comma and trim whitespace
        frontText: this.flashcardForm.value.frontText,
        backText: this.flashcardForm.value.backText,
        visibility: this.flashcardForm.value.visibility,
        deckId: this.flashcardForm.value.deckName,
        userId: this.userId,
      };

      // Check if deckId is provided and is a non-empty string
      if (flashcardData.deckId) {
        console.log(flashcardData);

        this.flashcardService
          .createFlashcard(flashcardData.deckId, flashcardData)
          .then((response: any) => {
            this.snackBar.open("Flashcard created successfully", "", {
              duration: 3000,
            });
            this.router.navigate(["home"]);
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
    } 
    else {
      // Form is invalid, display error message or handle as needed
      this.snackBar.open("Please fill out all required fields correctly.", "", {
        duration: 3000,
      });
    }
  }
}
