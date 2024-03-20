const { FlashcardVote } = require('../schema/flashcardVoteSchema')

// Function to add default flashcard vote data
async function createDefaultFlashcardVote() {
    try {
        // Check if there are any existing flashcard votes
        const existingFlashcardVote = await FlashcardVote.findOne({});

        // If no flashcard vote exists, create a default one
        if (!existingFlashcardVote) {
            await FlashcardVote.create({
                flashcardId: "flashcard_id_here", // Replace with actual flashcard ID
                userId: "user_id_here", // Replace with actual user ID
                voteType: 'upvote' // Assuming it's an upvote
            });
            console.log('Default flashcard vote created successfully.');
        } else {
            console.log('Flashcard vote already exists.');
        }
    } catch (error) {
        console.error('Error creating default flashcard vote:', error);
    }
}

module.exports = { createDefaultFlashcardVote };
