/**
 * Controller functions for managing flashcards.
 * @module flashcardControllers
 */

// internal imports
const schema = require("../schema");
const { Flashcard } = schema.Flashcard;
const { FlashcardVote } = schema.FlashcardVote;
const validator = require("../validators");
const { token_provided, verifyToken } = validator.tokenValidator;
const {
  validateBody,
  validateFrontText,
  validateBackText,
  validateTags,
  validateVisibility,
} = validator.flashcardValidator;

/**
 * Retrieves all flashcards owned by the token owner and public flashcards.
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response containing all the retrieved flashcards.
 */
const getAllFlashcards = async (req, res) => {
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

    // Find all flashcards owned by the token owner and public flashcards
    const flashcards = await Flashcard.find({
      $or: [{ userId }, { visibility: "public" }],
    });

    // Return the flashcards in the response
    return res
      .status(200)
      .send({ message: "Retrieve Data Successfully", data: flashcards });
  } catch (error) {
    // console.error(error)
    return res.status(500).send({ error: "Failed to fetch flashcards" });
  }
};

/**
 * Retrieves a specific flashcard owned by the token owner or public.
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {string} req.params.id - The ID of the flashcard to retrieve.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response containing the retrieved flashcard.
 */
const getSingleFlashcard = async (req, res) => {
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

    // Extract flashcard ID from request parameters
    const flashcardId = req.params.id;

    // Find the flashcard by ID and check if it is owned by the token owner or public
    const flashcard = await Flashcard.findOne({
      _id: flashcardId,
      $or: [{ userId }, { visibility: "public" }],
    });
    console.log(flashcard);
    if (!flashcard) {
      return res.status(404).send({ message: "Flashcard not found" });
    }

    // Return the flashcard in the response
    return res
      .status(200)
      .send({ message: "Retrieved Data Successfully", data: flashcard });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Failed to fetch flashcard" });
  }
};

/**
 * Creates a new flashcard.
 * @param {Object} req - The request object.
 * @param {string} req.params.deckid - The ID of the deck to which the flashcard belongs.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {Object} req.body - The body of the request containing flashcard information.
 * @param {string} req.body.frontText - The text displayed on the front side of the flashcard.
 * @param {string} req.body.backText - The text displayed on the back side of the flashcard.
 * @param {string[]} req.body.tags - An array of tags associated with the flashcard.
 * @param {string} req.body.visibility - The visibility of the flashcard (public or private).
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response containing the newly created flashcard.
 */
const postFlashcard = async (req, res) => {
  try {
    const deckId = req.params.deckid;

    if (Object.keys(req.body).length === 0) {
      return res
        .status(204)
        .send({ message: "Flashcard Data is not provided" });
    }

    if (Object.keys(req.body).length > 0 && !validateBody(req.body).test) {
      const message = validateBody(req.body).message;
      return res.status(206).send({ message: `${message}` });
    }

    // Extract flashcard information from request body
    const { frontText, backText, tags, visibility } = req.body;

    // console.log(req.body)
    // Validate front text
    if (!validateFrontText(frontText)) {
      return res.status(400).json({
        error:
          "Invalid front text format. Front text can be alphanumeric or in HTML format.",
      });
    }

    // Validate back text
    if (!validateBackText(backText)) {
      return res.status(400).json({
        error:
          "Invalid back text format. Back text can be alphanumeric or in HTML format.",
      });
    }

    if (!validateTags(tags)) {
      0;
      return res.status(400).json({
        error: "Invalid tags format. Tags should be alphanumeric strings.",
      });
    }

    if (!validateVisibility(visibility)) {
      return res.status(400).json({
        error:
          "Invalid visibility value. Visibility should be 'private' or 'public'.",
      });
    }

    // Verify token and extract user ID
    const token = req.headers.authorization;
    if (!token_provided(token)) {
      // console.log("test idhaara aya1")
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return res.status(403).send({ message: "Forbidden. Invalid token." });
    }
    const userId = decodedToken.userId;

    // Create new flashcard instance
    const newFlashcard = new Flashcard({
      deckId: deckId,
      userId: userId,
      frontText: frontText,
      backText: backText,
      tags: tags,
      owner: true,
      visibility: visibility || "private", // Set default visibility to private if not provided
    });
    // console.log(newFlashcard)

    // Save the new flashcard to the database
    const savedFlashcard = await newFlashcard.save();

    // Return the saved flashcard in the response
    return res
      .status(201)
      .send({ message: "New flashcard created", data: savedFlashcard });
  } catch (error) {
    // console.error(error)
    return res.status(500).send({ error: "Failed to create flashcard" });
  }
};

/**
 * Updates a flashcard.
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {string} req.params.id - The ID of the flashcard to update.
 * @param {Object} req.body - The body of the request containing updated flashcard information.
 * @param {string} req.body.frontText - The updated text displayed on the front side of the flashcard.
 * @param {string} req.body.backText - The updated text displayed on the back side of the flashcard.
 * @param {string[]} req.body.tags - The updated array of tags associated with the flashcard.
 * @param {string} req.body.visibility - The updated visibility of the flashcard (public or private).
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response containing the updated flashcard.
 */
const updateFlashcard = async (req, res) => {
  try {
    // console.log("aaya")
    const { frontText, backText, visibility } = req.body;

    // Validate front text
    if (!validateFrontText(frontText)) {
      return res.status(400).json({
        error:
          "Invalid front text format. Front text must be between 3 and 200 characters long and can contain any format of HTML tags and alphanumeric characters.",
      });
    }

    // Validate back text
    if (!validateBackText(backText)) {
      return res.status(400).json({
        error:
          "Invalid back text format. Back text must be between 3 and 500 characters long and can contain any format of HTML tags and alphanumeric characters.",
      });
    }

    // Validate visibility
    if (!validateVisibility(visibility)) {
      return res.status(400).json({
        error:
          "Invalid visibility value. Visibility should be 'private' or 'public'.",
      });
    }

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

    // Extract flashcard ID from request parameters
    const flashcardId = req.params.id;

    // Find the flashcard by ID
    const flashcard = await Flashcard.findById(flashcardId);
    if (!flashcard) {
      return res.status(404).send({ message: "Flashcard not found" });
    }

    // Check if the user is the owner of the flashcard
    if (!flashcard.owner || flashcard.userId.toString() !== userId.toString()) {
      return res.status(403).send({
        message: "Forbidden. You are not authorized to update this flashcard.",
      });
    }

    // Check if the request is trying to change visibility from public to private
    if (
      flashcard.visibility === "public" &&
      req.body.visibility === "private"
    ) {
      return res
        .status(400)
        .send({ message: "Cannot change visibility from public to private" });
    }

    // Update specific properties of the flashcard based on the request body
    flashcard.set(req.body);
    const updatedFlashcard = await flashcard.save();

    // Return the updated flashcard in the response
    return res
      .status(200)
      .send({ message: "Flashcard updated", data: updatedFlashcard });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Failed to update flashcard" });
  }
};

/**
 * Deletes a flashcard.
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The JWT token provided in the request headers.
 * @param {string} req.params.id - The ID of the flashcard to delete.
 * @param {Object} res - The response object.
 * @returns {Object} Returns a response indicating the success or failure of the deletion process.
 */
const deleteFlashcard = async (req, res) => {
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

    // Extract flashcard ID from request parameters
    const flashcardId = req.params.id;

    // Find the flashcard by ID
    const flashcard = await Flashcard.findById(flashcardId);
    if (!flashcard) {
      return res.status(404).send({ message: "Flashcard not found" });
    }

    // Check if the user is the owner of the flashcard
    if (!flashcard.owner || flashcard.userId.toString() !== userId.toString()) {
      return res.status(403).send({
        message: "Forbidden. You are not authorized to delete this flashcard.",
      });
    }

    if (flashcard.visibility === "public") {
      return res.status(403).send({
        message: "Forbidden. Flashcard which are public cannnot be deleted.",
      });
    }

    // Delete related data in flashcardVote
    await FlashcardVote.deleteMany({ flashcardId: flashcardId });

    // Delete the flashcard
    await Flashcard.findByIdAndDelete(flashcardId);

    // Return success message
    return res.status(200).send({ message: "Flascard Deleted Succesfuully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Failed to delete flashcard" });
  }
};

module.exports = {
  getAllFlashcards,
  getSingleFlashcard,
  updateFlashcard,
  postFlashcard,
  deleteFlashcard,
};
