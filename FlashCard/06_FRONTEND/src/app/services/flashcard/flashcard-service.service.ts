import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FlashcardServiceService {

  private Url = 'http://localhost:8080/flashcards'
  private token: string | null = null;
  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar) {
      this.token = localStorage.getItem('Authorization');
    }

    private handleError(error: any): Promise<any> {
      console.error(error);
      this.snackBar.open('An error occurred. Please try again.', '', { duration: 3000 });
      return Promise.reject(error);
    }
  
    private getHeaders(): { [header: string]: string } {
      return this.token ? { 'Authorization': this.token } : {};
    }
  
    createFlashcard(deckId: string, flashcardData: any): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(`${this.Url}/${deckId}`, flashcardData, { headers: this.getHeaders() }).subscribe(
          (res: any) => {
            this.snackBar.open('Flashcard created successfully', '', { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
      });
    }
  
    getAllFlashcards(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.http.get<any>(`${this.Url}/getAll`, { headers: this.getHeaders() }).subscribe(
          (data: any) => {
            resolve(data);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
      });
    }
  
    getFlashcardById(id: string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.http.get<any>(`${this.Url}/${id}`, { headers: this.getHeaders() }).subscribe(
          (data: any) => {
            resolve(data);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
      });
    }
  
    updateFlashcard(id: string, flashcardData: any): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.http.put<any>(`${this.Url}/${id}`, flashcardData, { headers: this.getHeaders() }).subscribe(
          (res: any) => {
            this.snackBar.open('Flashcard updated successfully', '', { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
      });
    }
  
    deleteFlashcard(id: string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.http.delete<any>(`${this.Url}/delete/${id}`, { headers: this.getHeaders() }).subscribe(
          (res: any) => {
            this.snackBar.open('Flashcard deleted successfully', '', { duration: 3000 });
            resolve(res);
          },
          error => {
            this.snackBar.open('Note : You cannot delete a public flashcard', '', { duration: 5000 });
            this.handleError(error);
            reject(error);
          }
        );
      });
    }
}
