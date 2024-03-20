const { DeckVote } = require('../schema/deckVoteSchema');

// Function to add default deck vote data
async function createDefaultDeckVote() {
    try {
        // Check if there are any existing deck votes
        const existingDeckVote = await DeckVote.findOne({});

        // If no deck vote exists, create a default one
        if (!existingDeckVote) {
            await DeckVote.create({
                flashcardId: "flashcard_id_here", // Replace with actual flashcard ID
                userId: "user_id_here", // Replace with actual user ID
                voteType: 'upvote' // Assuming it's an upvote
            });
            console.log('Default deck vote created successfully.');
        } else {
            console.log('Deck vote already exists.');
        }
    } catch (error) {
        console.error('Error creating default deck vote:', error);
    }
}

module.exports = { createDefaultDeckVote };
