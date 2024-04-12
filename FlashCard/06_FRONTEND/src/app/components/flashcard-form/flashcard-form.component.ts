import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Deck } from "../../interface/deckInterface";
import { RegisterService } from "../../services/auth/user.service";
import { DeckService } from "../../services/deck/deck.service";

@Component({
  selector: "app-flashcard-form",
  templateUrl: "./flashcard-form.component.html",
  styleUrl: "./flashcard-form.component.css",
})
export class FlashcardFormComponent implements OnInit {
  @Input() initialData: any;
  @Input() decks: any;
  @Input() title: string = "";
  @Input() buttonLabel: string = "";
  @Output() submitForm: EventEmitter<any> = new EventEmitter();
  flashcardForm: any;
  userId: string = "";

  @Input() frontText: string = "";
  @Input() backText: string = "";

  editorConfig = {
    plugins: "lists link image paste help wordcount",
    toolbar:
      "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
    skin: "oxide-dark",
    content_css: "dark",
  };

  // Object to track focus state of input fields
  inputFocus: { [key: string]: boolean } = {
    tags: false,
    frontText: false,
    backText: false,
    visibility: false,
    deckName: false,
  };

  ngOnInit(): void {
    this.flashcardForm = new FormGroup({
      tags: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.pattern(/^[a-zA-Z0-9\s,]*$/),
      ]),
      visibility: new FormControl("", [Validators.required]),
      deckName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
      ]),
    });

    this.getUserDetails();
  }

  constructor(
    private userService: RegisterService,
    private deckService: DeckService
  ) {}
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
        // Populate form with initial data
        if (this.initialData) {
          this.populateForm(this.initialData);
        }
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

  // Listen for event to populate form with flashcard data// Populate form with flashcard data
  populateForm(formData: any) {
    this.flashcardForm.patchValue({
      tags: formData.tags.join(", "),
      visibility: formData.visibility,
      deckName: formData.deckId,
    });
  }

  onSubmit(): void {
    if (this.flashcardForm) {
      // Form is valid, continue with flashcard creation
      const formData = {
        tags: this.flashcardForm.value.tags
          ?.split(",")
          .map((tag: string) => tag.trim()), // Split tags by comma and trim whitespace
        frontText: this.frontText,
        backText: this.backText,
        visibility: this.flashcardForm.value.visibility,
        deckId: this.flashcardForm.value.deckName,
        userId: this.userId,
      };
      this.submitForm.emit(formData);
    }
  }
}
