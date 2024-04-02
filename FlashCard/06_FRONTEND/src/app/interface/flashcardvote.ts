export interface FlashcardVote {
    _id: string;
    flashcardId: string;
    userId: string;
    voteType: 'upvote' | 'downvote';
  }