/**
 * Controller functions for searching.
 * @module flashcardVoteControllers
 */

// internal imports
const schema = require("../schema");
const { Deck } = schema.Deck;
const { Flashcard } = schema.Flashcard;
const { FlashcardVote } = schema.FlashcardVote;
const { DeckVote } = schema.DeckVote;
const validator = require("../validators");
const { token_provided, verifyToken } = validator.tokenValidator;

/**
 * Searches flashcards and decks based on a query string.
 * @param {Object} req - The request object.
 * @param {string} req.query.query - The search query string.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {Object} res - The response object.
 * @returns {Object} Returns sorted results based on votes in the response.
 */
const search = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { query } = req.query;
    // Verify token and extract user ID
    const token = req.headers.authorization;
    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return res.status(403).send({ message: "Forbidden. Invalid token." });
    }
    // Search flashcards based on query
    const flashcards = await Flashcard.find({
      $or: [
        { frontText: { $regex: query, $options: "i" } },
        { backText: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });

    // Extract deckIds from flashcards
    const deckIds = flashcards.map((flashcard) => flashcard.deckId);

    // Search decks based on deckIds
    let flashDeck = await Deck.find({ _id: { $in: deckIds } });
    flashDeck = flashDeck.filter((deck) => deck.visibility === "public");

    // Search decks based on query
    const decks = await Deck.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    // Filter decks to include only public decks
    let publicDecks = decks.filter((deck) => deck.visibility === "public");

    // Combine flashDeck and publicDecks and remove duplicates
    let combinedDecks = [...flashDeck, ...publicDecks];
    combinedDecks = Array.from(new Set(combinedDecks.map(JSON.stringify))).map(JSON.parse);


    // Aggregate votes for decks
    const deckVotes = await DeckVote.aggregate([
      { $match: { deckId: { $in: combinedDecks.map((deck) => deck._id) } } },
      {
        $group: {
          _id: "$deckId",
          upvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] },
          },
          downvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] },
          },
        },
      },
    ]);

    // Aggregate votes for flashcards
    const flashcardVotes = await FlashcardVote.aggregate([
      {
        $match: {
          flashcardId: { $in: flashcards.map((flashcard) => flashcard._id) },
        },
      },
      {
        $group: {
          _id: "$flashcardId",
          upvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] },
          },
          downvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] },
          },
        },
      },
    ]);

    // Combine deck votes and flashcard votes
    const allVotes = [...deckVotes, ...flashcardVotes];

    // Sort decks and flashcards based on votes
    const sortedResults = combinedDecks.sort((a, b) => {
      const voteA = allVotes.find((vote) => vote._id.equals(a._id));
      const voteB = allVotes.find((vote) => vote._id.equals(b._id));
      const upvotesA = voteA ? voteA.upvotes : 0;
      const downvotesA = voteA ? voteA.downvotes : 0;
      const upvotesB = voteB ? voteB.upvotes : 0;
      const downvotesB = voteB ? voteB.downvotes : 0;
      const totalVotesA = upvotesA - downvotesA;
      const totalVotesB = upvotesB - downvotesB;
      return totalVotesB - totalVotesA;
      
    });

    // Return sorted results in the response
    return res.status(200).json({ results: sortedResults });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to perform search." });
  }
};

// Export the search function
module.exports = search;
