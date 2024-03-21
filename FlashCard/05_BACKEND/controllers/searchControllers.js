const { Deck } = require('../schema/deckSchema');
const { Flashcard } = require('../schema/flashcardSchema');
const { FlashcardVote } = require('../schema/flashcardVoteSchema');
const { DeckVote } = require('../schema/deckVoteSchema');

// Search API route handler
const search = async (req, res) => {
    try {
        // Extract search query from request query parameters
        const { query } = req.query;

        // Search flashcards based on query
        const flashcards = await Flashcard.find({
            $or: [
                { frontText: { $regex: query, $options: 'i' } },
                { backText: { $regex: query, $options: 'i' } },
                { tags: query }
            ]
        }).populate('deckId');

        // Search decks based on query
        const decks = await Deck.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        // Filter decks to include only public decks
        const publicDecks = decks.filter(deck => deck.visibility === 'public');

        // Aggregate votes for decks
        const deckVotes = await DeckVote.aggregate([
            { $match: { deckId: { $in: publicDecks.map(deck => deck._id) } } },
            { $group: { _id: "$deckId", upvotes: { $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] } }, downvotes: { $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] } } } }
        ]);

        // Aggregate votes for flashcards
        const flashcardVotes = await FlashcardVote.aggregate([
            { $match: { flashcardId: { $in: flashcards.map(flashcard => flashcard._id) } } },
            { $group: { _id: "$flashcardId", upvotes: { $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] } }, downvotes: { $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] } } } }
        ]);

        // Combine deck votes and flashcard votes
        const allVotes = [...deckVotes, ...flashcardVotes];

        // Sort decks and flashcards based on votes
        const sortedResults = [...publicDecks, ...flashcards].sort((a, b) => {
            const voteA = allVotes.find(vote => vote._id.equals(a._id));
            const voteB = allVotes.find(vote => vote._id.equals(b._id));
            const upvotesA = voteA ? voteA.upvotes : 0;
            const downvotesA = voteA ? voteA.downvotes : 0;
            const upvotesB = voteB ? voteB.upvotes : 0;
            const downvotesB = voteB ? voteB.downvotes : 0;
            const totalVotesA = upvotesA - downvotesA;
            const totalVotesB = upvotesB - downvotesB;
            return totalVotesB - totalVotesA;
        });

        // Return sorted results in the response
        res.status(200).json({ results: sortedResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to perform search." });
    }
};

// Export the search function
module.exports = { search };
