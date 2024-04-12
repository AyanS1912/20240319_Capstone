import { Component, OnInit, Input, EventEmitter, Output , OnChanges} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DeckService } from "../../services/deck/deck.service";


@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.css'
})
export class DeckFormComponent implements OnInit{

  @Input() formTitle: string = '';
  @Input() submitButtonLabel: string = '';
  @Input() initialData: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  deckForm: any;
  nameInputFocused: boolean = false;
  descInputFocused: boolean = false;
  constructor(
    private deckService : DeckService,
    private snackBar : MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initForm();
    console.log(this.initialData)
    this.populateForm();
    
  }
  ngOnChanges(): void {
    if (this.initialData) {
      this.populateForm();
    }
  }

  initForm(){
    // Define FormGroup to manage form controls and their validations
    this. deckForm = new FormGroup({
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
    console.log(this.initialData)
    
  }
  
 
  populateForm() {
    console.log(this.initialData)
    if (this.initialData) {
      console.log(this.initialData)
      this.deckForm.patchValue({
        name: this.initialData.name,
        description: this.initialData.description,
        visibility: this.initialData.visibility
      });
    }
  }
  
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
    if (this.deckForm.valid) {
      this.formSubmitted.emit(this.deckForm.value);
    } else {
      this.snackBar.open("Please fill all required fields correctly", "", {
        duration: 3000,
      });
    }
  }
}
