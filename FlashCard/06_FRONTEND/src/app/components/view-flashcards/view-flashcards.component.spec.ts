import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlashcardsComponent } from './view-flashcards.component';

describe('ViewFlashcardsComponent', () => {
  let component: ViewFlashcardsComponent;
  let fixture: ComponentFixture<ViewFlashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFlashcardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
