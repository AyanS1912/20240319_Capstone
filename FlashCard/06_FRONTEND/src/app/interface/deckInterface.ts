export interface Deck {
  _id: string;
  name: string;
  description: string;
  userId :string
  visibility: string;
  upvotes: number; 
  downvotes: number; 
}