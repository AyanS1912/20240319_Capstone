import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../../services/auth/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-myprofile",
  templateUrl: "./myprofile.component.html",
  styleUrl: "./myprofile.component.css",
})
export class MyprofileComponent implements OnInit {
  userDetails: any;

  constructor(
    private userService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  confirmDelete(userId : string) {
    if (window.confirm("Are you sure you want to delete your account?")) {
      this.deleteUser(userId);
    }
  }
  
  getUserDetails() {
    this.userService.getUserDetails().then(
      (data) => {
        this.userDetails = data;
        console.log(this.userDetails)
      },
      (error) => {
        console.error("Failed to fetch user details:", error);
      }
    );
  }

  deleteUser(userId : string) {
    console.log("Clicked")
    this.userService.deleteUser(userId).then(
      () => {
        this.snackBar.open('User deleted successfully', '', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Failed to delete user:', error);
      }
    );
  }
}
