import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit{

  constructor(
    private loginservice : RegisterService,
    private snackBar : MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
      
  }

  loginform = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
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

  usernameInputFocused: boolean = false;
  passwordInputFocused: boolean = false;

  onFocus(controlName: string) {
    if (controlName === "userName") {
      this.usernameInputFocused = true;
    } else if (controlName === "password") {
      this.passwordInputFocused = true;
    }
  }

  onBlur(controlName: string) {
    if (controlName === "userName") {
      this.usernameInputFocused = false;
    } else if (controlName === "password") {
      this.passwordInputFocused = false;
    }
  }
  onSubmit() {
    if (this.loginform.invalid) {
      return;
    }

    const userData = this.loginform.value;
    console.log(userData)
    this.loginservice.login(userData).then(
      () => {
        this.snackBar.open("Login successful", "", { duration: 3000 });
        this.router.navigate(['/home']);
      },
      (error) => {
        this.snackBar.open("Login failed. Please check your credentials and try again.", "", { duration: 3000 });
      }
    );
  }
}
