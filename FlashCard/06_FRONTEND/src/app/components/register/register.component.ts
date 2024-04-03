import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {

   // Initialize the register form with form controls and validators
  registerForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
      ),
    ]),
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]{4,20}$/),
    ]),
  });

   // Initialize boolean variables to track input focus state
  usernameInputFocused: boolean = false;
  emailInputFocused: boolean = false;
  passwordInputFocused: boolean = false;

  // Method to handle input focus events
  onFocus(controlName: string) {
    if (controlName === "userName") {
      this.usernameInputFocused = true;
    } else if (controlName === "email") {
      this.emailInputFocused = true;
    } else if (controlName === "password") {
      this.passwordInputFocused = true;
    }
    console.log(
      this.emailInputFocused,
      this.usernameInputFocused,
      this.passwordInputFocused
    );
  }

   // Method to handle input blur events
  onBlur(controlName: string) {
    if (controlName === "userName") {
      this.usernameInputFocused = false;
    } else if (controlName === "email") {
      this.emailInputFocused = false;
    } else if (controlName === "password") {
      this.passwordInputFocused = false;
    }
    console.log(
      this.emailInputFocused,
      this.usernameInputFocused,
      this.passwordInputFocused
    );
  }

  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router : Router 
  ) {}

  ngOnInit(): void {}

  // Method to handle form submission
  onSubmit() {
    if (this.registerForm.invalid) {
      return;// Return if form is invalid
    }

    // Extract user data from the form
    const userData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      username: this.registerForm.value.username,
    };
    // console.log(userData);

    // Call the register service to register the user
    this.registerService.register(userData).then(
      () => {
        // Registration successful
        console.log("Registration successful");
        this.snackBar.open("Registration done successfully. Navigating to Login Page", "", {
          duration: 3000,
        });
        this.router.navigate(['/login'])
      },
      (error) => {
        // Registration failed
        console.error("Registration failed:", error);
        this.snackBar.open("Registration failed. Please try again.", "", {
          duration: 3000,
        });
      }
    );
  }
}
