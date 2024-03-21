const { Deck } = require("../schema/deckSchema");
const { token_provided, verifyToken } = require("../validators/tokenValidator");

const postDeck = async (req, res) => {
    try {
      // Extract deck information from request body
      const { name, description, visibility } = req.body;
      // Verify token and extract user ID
      const token = req.headers.authorization;
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
module.exports = { postDeck };
