import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  createCard: boolean = false

  constructor() { }

  updateSelectedComponent() {
    this.createCard = true;
    console.log("shared from",this.createCard)
  }
}
