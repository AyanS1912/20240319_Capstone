const { Flashcard } = require('../schema/flashcardSchema');

// Function to add default flashcard data
async function createDefaultFlashcard() {
    try {
        // Check if there are any existing flashcards
        const existingFlashcard = await Flashcard.findOne({});

        // If no flashcard exists, create a default one
        if (!existingFlashcard) {
            await Flashcard.create({
                deckId: "deck_id_here", // Replace with actual deck ID
                userId: "user_id_here", // Replace with actual user ID
                frontText: "Front Text Here",
                backText: "Back Text Here",
                tags: ["tag1", "tag2"], // Add tags as needed
                owner: true, // Assuming the user is the owner
                visibility: 'private' // Assuming the flashcard is private
            });
            console.log('Default flashcard created successfully.');
        } else {
            console.log('Flashcard already exists.');
        }
    } catch (error) {
        console.error('Error creating default flashcard:', error);
    }
}

module.exports = { createDefaultFlashcard };
