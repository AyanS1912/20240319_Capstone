const { Deck } = require('../schema/deckSchema');

// Function to add default deck data
async function createDefaultDeck() {
    try {
        // Check if there are any existing decks
        const existingDeck = await Deck.findOne({});

        // If no deck exists, create a default deck
        if (!existingDeck) {
            await Deck.create({
                name: "Default Deck",
                description: "This is a default deck.",
                userId: "65fac2b876f3b1c60689143d", // Reference to the user who owns the deck
                owner: true, // Assuming the user is the owner
                visibility: 'private' // Assuming the deck is private
            });
            console.log('Default deck created successfully.');
        } else {
            console.log('Deck already exists.');
        }
    } catch (error) {
        console.error('Error creating default deck:', error);
    }
}

module.exports = { createDefaultDeck };
