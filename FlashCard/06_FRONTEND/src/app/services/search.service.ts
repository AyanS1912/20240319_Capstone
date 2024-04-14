import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = 'http://localhost:8080/search';
  private token: string | null = null;

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar
  ) {this.token = sessionStorage.getItem('Authorization');}

  private handleError(error: any): Promise<any> {
    console.error(error);
    this.snackBar.open('An error occurred during search. Please try again.', '', { duration: 3000 });
    return Promise.reject(error);
  }

  private getHeaders(): { [header: string]: string } {
    return this.token ? { 'Authorization': this.token } : {};
  }
  
  search(query: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.url}/q?query=${query}`,{ headers: this.getHeaders() }).subscribe(
        (data: any) => {
          console.log(data)
          resolve(data.results);
        },
        error => {
          this.handleError(error);
          reject(error);
        }
      );
    });
  }
}
