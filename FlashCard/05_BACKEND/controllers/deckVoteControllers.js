/**
 * Controller functions for managing Deck Vote.
 * @module deckVoteControllers
 */

// internal imports
const schema = require('../schema')
const { DeckVote } = schema.DeckVote
const { token_provided, verifyToken } = require('../validators/tokenValidator')


/**
 * Get all votes or search by deck ID.
 * @param {Object} req - The request object.
 * @param {string} req.params.deckId - (Optional) The ID of the deck to search votes for.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response containing all votes or votes for the specified deck.
 */
const getAllVotes = async (req, res) => {
    try {
        const deckId = req.params.deckId;
        let votes;

        if (deckId) {
            // If deck ID is provided, search votes by deck ID
            votes = await DeckVote.find({ deckId : deckId });
        } else {
            // If no deck ID provided, fetch all votes
            votes = await DeckVote.find();
        }

        return res.status(200).json({ data: votes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get votes.' });
    }
}

/**
 * Upvotes a deck.
 * @param {Object} req - The request object.
 * @param {string} req.params.deckId - The ID of the deck to upvote.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response indicating success or failure of the upvote operation.
 */
const upvoteDeck = async (req, res) => {
    try {
        // Extract deck ID from request parameters
        
        const deckId = req.params.deckId
        
        // Verify token and extract user ID
        const token = req.headers.authorization
        if (!token_provided(token)) {
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }
        const decodedToken = await verifyToken(token)
        if (!decodedToken) {
            return res.status(403).send({ message: "Forbidden. Invalid token." })
        }
        
        const userId = decodedToken.userId
        
        // Check if the user has already voted for this deck
        let existingVote = await DeckVote.findOne({ deckId, userId })
        if (existingVote) {
            // If the user has already downvoted the deck, update the existing vote to an upvote
            
            if (existingVote.voteType === "downvote") {
                existingVote.voteType = "upvote"
                await existingVote.save()
                return res.status(200).send({ message: "Your downvote has been changed to an upvote." , data : existingVote})
            }
            // If the user has already upvoted the deck, return a message
            // console.log(existingVote+"yyooo")
            return res.status(200).send({ message: "You have already upvoted this deck.", data : existingVote })
        }
        

        // Create a new upvote for the deck
        existingVote = new DeckVote({
            deckId,
            userId,
            voteType: "upvote"
        })
        await existingVote.save()

        return res.status(200).send({ message: "Deck upvoted successfully.", data : existingVote })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: "Failed to upvote deck." })
    }
}

/**
 * Downvotes a deck.
 * @param {Object} req - The request object.
 * @param {string} req.params.deckId - The ID of the deck to downvote.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response indicating success or failure of the downvote operation.
 */
const downvoteDeck = async (req, res) => {
    try {
        // Extract deck ID from request parameters
        const deckId = req.params.deckId

        // Verify token and extract user ID
        const token = req.headers.authorization
        if (!token_provided(token)) {
            return res.status(401).send({ error: "Access denied. Token not provided." })
        }
        const decodedToken = await verifyToken(token)
        if (!decodedToken) {
            return res.status(403).send({ message: "Forbidden. Invalid token." })
        }
        const userId = decodedToken.userId

        // Check if the user has already voted for this deck
        let existingVote = await DeckVote.findOne({ deckId, userId })
        if (existingVote) {
            // If the user has already upvoted the deck, update the existing vote to a downvote
            if (existingVote.voteType === "upvote") {
                existingVote.voteType = "downvote"
                await existingVote.save()
                return res.status(200).send({ message: "Your upvote has been changed to a downvote.", data : existingVote })
            }
            // If the user has already downvoted the deck, return a message
            return res.status(200).send({ message: "You have already downvoted this deck.", data : existingVote})
        }

        // Create a new downvote for the deck
        existingVote = new DeckVote({
            deckId,
            userId,
            voteType: "downvote"
        })
        await existingVote.save()

        return res.status(200).send({ message: "Deck downvoted successfully.", data : existingVote })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: "Failed to downvote deck." })
    }
}

module.exports = { getAllVotes,upvoteDeck, downvoteDeck }
