import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckFlashcardsComponent } from './deck-flashcards.component';

describe('DeckFlashcardsComponent', () => {
  let component: DeckFlashcardsComponent;
  let fixture: ComponentFixture<DeckFlashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckFlashcardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeckFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
