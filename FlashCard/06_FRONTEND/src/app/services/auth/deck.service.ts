import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private Url = "http://localhost:8080/decks";
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  createDeck(deckData: any): Promise<any> {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      return Promise.reject('No token found');
    }

    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${this.Url}/post`, deckData, { headers: { Authorization: token } }).subscribe(
        (res: any) => {
          this.snackBar.open('Deck created successfully', '', { duration: 3000 });
          this.router.navigate(['home'])
          resolve(res);
        },
        (error) => {
          this.handleError(error);
          reject(error);
        }
      );
    });
  }

  getAllDecks(): Promise<any> {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      return Promise.reject('No token found');
    }

    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.Url}/getAll`, { headers: { Authorization: token } }).subscribe(
        (data: any) => {
          // console.log("Yokoso",data)
          resolve(data);
        },
        (error) => {
          this.handleError(error);
          reject(error);
        }
      );
    });
  }

  getDecks(deckId: string): Promise<any> {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      return Promise.reject('No token found');
    }

    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.Url}/get/${deckId}`, { headers: { Authorization: token } }).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          this.handleError(error);
          reject(error);
        }
      );
    });
  }

  updateDeck(id: string, deckData: any): Promise<any> {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      return Promise.reject('No token found');
    }

    return new Promise<any>((resolve, reject) => {
      this.http.put<any>(`${this.Url}/update/${id}`, deckData, { headers: { Authorization: token } }).subscribe(
        (res: any) => {
          this.snackBar.open('Deck updated successfully', '', { duration: 3000 });
          resolve(res);
        },
        (error) => {
          this.handleError(error);
          reject(error);
        }
      );
    });
  }

  deleteDeck(id: string): Promise<any> {
    // console.log(id)
    const token = localStorage.getItem('Authorization');
    // console.log(token);
    if (!token) {
      return Promise.reject('No token found');
    }
    
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(`${this.Url}/delete/${id}`, { headers: { Authorization: token } }).subscribe(
        (res: any) => {
          this.snackBar.open('Deck deleted successfully', '', { duration: 3000 });
          resolve(res);
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
    this.snackBar.open('An error occurred. Please try again. Note : You Cannot delete a publicly available deck', '', { duration: 3000 });
  }
}
