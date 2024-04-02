export interface DeckVote {
    _id: string;
    deckId: string;
    userId: string;
    voteType: 'upvote' | 'downvote';
  }