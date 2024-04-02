import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class VoteService {
  private Url = "http://localhost:8080"; // Update with your API base URL
  private token : string | null =''
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('Authorization');
  }

  // Upvote a flashcard
  upvoteFlashcard(flashcardId: string, token: string): Promise<any> {
    const url = `${this.Url}/flashcardsvote/upvote`;
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(url, {flashcardId}, { headers: this.getHeaders(token) })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // Downvote a flashcard
  downvoteFlashcard(flashcardId: string, token: string): Promise<any> {
    const url = `${this.Url}/flashcardsvote/downvote`;
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(url, {flashcardId}, { headers: this.getHeaders(token) })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // Upvote a deck
  upvoteDeck(deckId: string, token: string): Promise<any> {
    const url = `${this.Url}/decksvote/upvote`;
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(url, {deckId}, { headers: this.getHeaders(token) })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // Downvote a deck
  downvoteDeck(deckId: string, token: string): Promise<any> {
    const url = `${this.Url}/decksvote/downvote`;
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(url, {deckId}, { headers: this.getHeaders(token) })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // Helper function to get HTTP headers with authorization token
  private getHeaders(token: string): { [header: string]: string } {
    return this.token ? { 'Authorization': this.token } : {};
  }
}
