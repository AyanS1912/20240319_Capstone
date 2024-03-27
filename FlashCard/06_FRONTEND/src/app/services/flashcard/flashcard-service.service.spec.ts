import { TestBed } from '@angular/core/testing';

import { FlashcardServiceService } from './flashcard-service.service';

describe('FlashcardServiceService', () => {
  let service: FlashcardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
