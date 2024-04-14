import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FlashcardVote } from "../../interface/flashcardvote";
import { DeckVote } from "../../interface/deckvote";

@Injectable({
  providedIn: "root",
})
export class VoteService {
  private Url = "http://localhost:8080"; // Update with your API base URL
  private token : string | null =''


  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('Authorization');
  }

  getVotesForFlashcard(flashcardId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`http://localhost:8080/flashcardsvote/${flashcardId}`)
        .toPromise()
        .then((response) => {
          resolve(response.data); // Resolve with the data from the response
        })
        .catch((error) => {
          reject(error); // Reject with the error
        });
    });
  }
  // Upvote a flashcard
  upvoteFlashcard(flashcardId: string): Promise<any> {
    const url = `${this.Url}/flashcardsvote/${flashcardId}/upvote`;
    return new Promise<FlashcardVote>((resolve, reject) => {
      this.http
        .post<any>(url, {flashcardId}, { headers: this.getHeaders() })
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
  downvoteFlashcard(flashcardId: string): Promise<any> {
    const url = `${this.Url}/flashcardsvote/${flashcardId}/downvote`;
    return new Promise<FlashcardVote>((resolve, reject) => {
      this.http
        .post<any>(url, {flashcardId}, { headers: this.getHeaders() })
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


  getVotesForDeck(deckId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`http://localhost:8080/decksvote/${deckId}`)
        .toPromise()
        .then((response) => {
          resolve(response.data); // Resolve with the data from the response
        })
        .catch((error) => {
          reject(error); // Reject with the error
        });
    });
  }
  // Upvote a deck
  upvoteDeck(deckId: string): Promise<any> {
    const url = `${this.Url}/decksvote/${deckId}/upvote`;
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(url, {deckId}, { headers: this.getHeaders() })
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
  downvoteDeck(deckId: string): Promise<any> {
    const url = `${this.Url}/decksvote/${deckId}/downvote`;
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(url,{}, { headers: this.getHeaders() })
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

  // Helper function to get HTTP headers with authorization this.token
  private getHeaders(): { [header: string]: string } {
    return this.token ? { 'Authorization': this.token } : {};
  }
}
