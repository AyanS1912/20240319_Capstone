export interface Flashcard {
  _id: string;
  deckId: string;
  userId: string;
  frontText: any;
  backText: any;
  tags: [string];
  visibility: string;
  upvotes: number;
  downvotes: number;
  userVoteType?: "upvote" | "downvote" | "";
}
