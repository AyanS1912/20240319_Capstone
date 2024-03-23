const { DeckVote } = require('./deckVoteSchema');
const { Flashcard } = require('./flashcardSchema');
const { FlashcardVote } = require('./flashcardVoteSchema');

// Export all schema files
module.exports = {
    User: require('./userSchema'),
    Deck : require('./deckSchema'),
    DeckVote : require('./deckVoteSchema'),
    Flashcard : require('./flashcardSchema'),
    FlashcardVote : require('./flashcardVoteSchema')
}