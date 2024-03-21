    const { Deck } = require("../schema/deckSchema");
    const { token_provided, verifyToken } = require("../validators/tokenValidator");

    // Function to get all decks owned by the token owner and public decks
    const getAllDecks = async (req, res) => {
        try {
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
        const userId = decodedToken.userId;
    
        // Find all decks owned by the token owner and public decks
        const decks = await Deck.find({ $or: [{ userId }, { visibility: 'public' }] });
    
        // Return the decks in the response
        res.status(200).send({ message : "Retrieve Data Sucessfully" , data : decks });
        } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch decks" });
        }
    };
    
    // Function to get a specific single deck owned by the token owner or public
    const getSingleDeck = async (req, res) => {
        try {
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
        const userId = decodedToken.userId;
    
        // Extract deck ID from request parameters
        const deckId = req.params.id;
    
        // Find the deck by ID and check if it is owned by the token owner or public
        const deck = await Deck.findOne({ _id: deckId, $or: [{ userId }, { visibility: 'public' }] });
        if (!deck) {
            return res.status(404).send({ message: "Deck not found" });
        }
    
        // Return the deck in the response
        res.status(200).send({ messgae : "Retrived Data Successfully ", data : deck });
        } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch deck" });
        }
    };
    
    const postDeck = async (req, res) => {
        try {
        // Extract deck information from request body
        const { name, description, visibility } = req.body;
        // Verify token and extract user ID
        const deckExist = await Deck.findOne({name:name})
        if(deckExist){
            return res.status(401).send({message : "Chose another name for Deck. Deck with same exist"})
        } 
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
        const userId = decodedToken.userId;

        // Create new deck instance
        const newDeck = new Deck({
            name : name,
            description : description,
            userId : userId,
            owner : true,
            visibility : visibility,
        });
    
        // Save the new deck to the database
        const savedDeck = await newDeck.save();
    
        // Return the saved deck in the response
        res.status(201).send({ message: "New deck created", deck: savedDeck });
        } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to create deck" });
        }
    };


    // Function to update a deck
    const updateDeck = async (req, res) => {
        try {
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
        const userId = decodedToken.userId;
    
        // Extract deck ID from request parameters
        const deckId = req.params.id;
    
        // Find the deck by ID
        const deck = await Deck.findById(deckId);
        if (!deck) {
            return res.status(404).send({ message: "Deck not found" });
        }
    
        // Check if the user is the owner of the deck
        if (!deck.owner || deck.userId.toString() !== userId.toString()) {
            return res.status(403).send({ message: "Forbidden. You are not authorized to update this deck." });
        }
        
        // Check if the request is trying to change visibility from public to private
        if (deck.visibility === "public" && req.body.visibility === "private") {
            return res.status(400).send({ message: "Cannot change visibility from public to private" });
        }

        // Update specific properties of the deck based on the request body
        if (req.body.name) {
                deck.name = req.body.name;
        }
        if (req.body.description) {
            deck.description = req.body.description;
        }
        if (req.body.visibility) {
            deck.visibility = req.body.visibility;
        }
        const updatedDeck = await deck.save();
    
        // Return the updated deck in the response
        res.status(200).send({ message: "Deck updated", data: updatedDeck });
        } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update deck" });
        }
    };
  
    // Function to delete a deck
    const deleteDeck = async (req, res) => {
    try {
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
      const userId = decodedToken.userId;
      // Extract deck ID from request parameters
      const deckId = req.params.id;
  
      // Find the deck by ID
      const deck = await Deck.findById(deckId);
      if (!deck) {
        return res.status(404).send({ message: "Deck not found" });
      }
  
      // Check if the user is the owner of the deck
      if (!deck.owner || deck.userId.toString() !== userId.toString()) {
        return res.status(403).send({ message: "Forbidden. You are not authorized to delete this deck." });
      }

      // Check if the deck visibility is public
      if (deck.visibility === "public") {
        return res.status(400).send({ message: "Cannot delete a publicly available deck" });
      }
  
      // Delete the deck
      await Deck.findByIdAndDelete(deckId);
  
      // Return success message
      res.status(200).send({ message: "Deck deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to delete deck" });
    }
    };

    module.exports = { getAllDecks, getSingleDeck, postDeck,updateDeck, deleteDeck };
