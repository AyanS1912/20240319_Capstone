import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private Url = "http://localhost:8080";
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  register(userData: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${this.Url}/auth/register`, userData).subscribe(
        (res: any) => {
          this.snackBar.open("Account created successfully", "", {
            duration: 3000,
          });
          this.router.navigate(["login"]);
          resolve(true);
        },
        (error) => {
          this.snackBar.open("Failed to Create New Account", "", {
            duration: 3000,
          });
          reject(error);
        }
      );
    });
  }

  login(credentials: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${this.Url}/auth/login`, credentials).subscribe(
        (response: any) => {
          localStorage.setItem("Authorization", response.token);
          resolve(response);
        },
        (error) => {
          this.handleError(error);
          reject(error);
        }
      );
    });
  }

  getUserDetails(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const token = localStorage.getItem('Authorization');
      // console.log(token)
      if (!token) {
        reject('No token found');
        return;
      }

      this.http.get<any>(`${this.Url}/users/getdetails`, { headers: { Authorization: `${token}` } }).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateUser(id: string, userData: any): Promise<any> {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      return Promise.reject("No token found in localStorage");
    }
    return new Promise<any>((resolve, reject) => {
      this.http
        .put<any>(`${this.Url}/user/${id}`, userData, {
          headers: { Authorization: `${token}` },
        })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  deleteUser(id: string): Promise<any> {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      return Promise.reject("No token found in localStorage");
    }
    return new Promise<any>((resolve, reject) => {
      this.http
        .delete<any>(`${this.Url}/users/delete/${id}`, {
          headers: { Authorization: `${token}` },
        })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  private handleError(error: any): void {
    console.error(error);
    this.snackBar.open("An error occurred. Please try again.", "", {
      duration: 3000,
    });
  }
}
