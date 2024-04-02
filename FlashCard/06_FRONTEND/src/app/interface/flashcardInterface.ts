export interface Flashcard {
  _id: string;
  deckId: string;
  userId: string;
  frontText: string;
  backText: string;
  tags: [string];
  visibility: string;
  upvotes: number;
  downvotes: number;
  userVoteType?: "upvote" | "downvote" | "";
}
