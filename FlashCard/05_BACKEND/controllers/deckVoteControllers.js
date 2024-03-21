    const { DeckVote } = require('../schema/deckVoteSchema')
    const {token_provided, verifyToken} = require('../validators/tokenValidator')

    // Upvote a deck
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
                    return res.status(200).send({ message: "Your downvote has been changed to an upvote." })
                }
                // If the user has already upvoted the deck, return a message
                return res.status(400).send({ message: "You have already upvoted this deck." })
            } 
            
            // Create a new upvote for the deck
            existingVote = new DeckVote({
                deckId,
                userId,
                voteType: "upvote"
            })
            await existingVote.save()

            res.status(200).send({ message: "Deck upvoted successfully." })
        } catch (error) {
            console.error(error)
            res.status(500).send({ error: "Failed to upvote deck." })
        }
    }

    // Downvote a deck
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
                    return res.status(200).send({ message: "Your upvote has been changed to a downvote." })
                }
                // If the user has already downvoted the deck, return a message
                return res.status(400).send({ message: "You have already downvoted this deck." })
            } 
            
            // Create a new downvote for the deck
            existingVote = new DeckVote({
                deckId,
                userId,
                voteType: "downvote"
            })
            await existingVote.save()

            res.status(200).send({ message: "Deck downvoted successfully." })
        } catch (error) {
            console.error(error)
            res.status(500).send({ error: "Failed to downvote deck." })
        }
    }


    module.exports = { upvoteDeck, downvoteDeck }
