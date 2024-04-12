import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardFormComponent } from './flashcard-form.component';

describe('FlashcardFormComponent', () => {
  let component: FlashcardFormComponent;
  let fixture: ComponentFixture<FlashcardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlashcardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlashcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
