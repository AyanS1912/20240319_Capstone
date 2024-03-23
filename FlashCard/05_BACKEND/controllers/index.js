const { DeckVote } = require('../schema/deckVoteSchema');

// Export all controller files
module.exports = {
    authController: require('./authControllers'),
    deckController : require('./deckControllers'),
    deckVoteController : require('./deckVoteControllers'),
    flashcardController : require('./flashcardControllers'),
    flashcardVoteController : require('./flashcardVoteControllers'),
    searchController : require('./searchControllers'),
    userController : require('./userControllers')
}
