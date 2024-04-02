/**
 * Controller functions for managing flashcards.
 * @module flashcardVoteControllers
 */

// internal imports
const schema = require('../schema')
const { FlashcardVote } = schema.FlashcardVote
const validator = require('../validators')
const { token_provided, verifyToken } = validator.tokenValidator


/**
 * Get all votes or search by deck ID.
 * @param {Object} req - The request object.
 * @param {string} req.params.deckId - (Optional) The ID of the deck to search votes for.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response containing all votes or votes for the specified deck.
 */
const getAllVotes = async (req, res) => {
    try {
        const flashcardId = req.params.deckId;
        let votes;

        if (flashcardId) {
            // If deck ID is provided, search votes by deck ID
            votes = await FlashcardVote.find({ flashcardId : flashcardId });
        } else {
            // If no deck ID provided, fetch all votes
            votes = await FlashcardVote.find();
        }

        return res.status(200).json({ data: votes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get votes.' });
    }
}

/**
 * Upvotes a flashcard.
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {string} req.params.flashcardId - The ID of the flashcard to upvote.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response indicating the success or failure of the upvoting process.
 */
const upvoteFlashcard = async (req, res) => {
    try {
        // Extract flashcard ID from request parameters
        const flashcardId = req.params.flashcardId

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

        // Check if the user has already voted for this flashcard
        let existingVote = await FlashcardVote.findOne({ flashcardId, userId })
        if (existingVote) {
            // If the user has already downvoted the flashcard, update the existing vote to an upvote
            if (existingVote.voteType === "downvote") {
                existingVote.voteType = "upvote"
                await existingVote.save()
                return res.status(200).send({ message: "Your downvote has been changed to an upvote." })
            }
            // If the user has already upvoted the flashcard, return a message
            return res.status(200).send({ message: "You have already upvoted this flashcard." })
        }

        // Create a new upvote for the flashcard
        existingVote = new FlashcardVote({
            flashcardId,
            userId,
            voteType: "upvote"
        })
        await existingVote.save()

        return res.status(200).send({ message: "Flashcard upvoted successfully." })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: "Failed to upvote flashcard." })
    }
}



/**
 * Downvotes a flashcard.
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {string} req.params.flashcardId - The ID of the flashcard to downvote.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response indicating the success or failure of the downvoting process.
 */
const downvoteFlashcard = async (req, res) => {
    try {
        // Extract flashcard ID from request parameters
        const flashcardId = req.params.flashcardId

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

        // Check if the user has already voted for this flashcard
        let existingVote = await FlashcardVote.findOne({ flashcardId, userId })
        if (existingVote) {
            // If the user has already upvoted the flashcard, update the existing vote to a downvote
            if (existingVote.voteType === "upvote") {
                existingVote.voteType = "downvote"
                await existingVote.save()
                return res.status(200).send({ message: "Your upvote has been changed to a downvote." })
            }
            // If the user has already downvoted the flashcard, return a message
            return res.status(400).send({ message: "You have already downvoted this flashcard." })
        }

        // Create a new downvote for the flashcard
        existingVote = new FlashcardVote({
            flashcardId: flashcardId,
            userId: userId,
            voteType: "downvote"
        })
        await existingVote.save()

        return res.status(200).send({ message: "Flashcard downvoted successfully." })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: "Failed to downvote flashcard." })
    }
}




module.exports = { getAllVotes,upvoteFlashcard, downvoteFlashcard }
