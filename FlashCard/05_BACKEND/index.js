// Load environment variables from .env file
require("dotenv").config()

// Import required modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// Create an Express app
const app = express()
// app.use(cors())
// Parse JSON requests
app.use(express.json())
app.use(cors())

// Define routes
const routes = require("./routes")
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes")
const deckRoutes = require("./routes/deckRoutes.js")
const deckVoteRoutes = require("./routes/deckVoteRoutes.js")
const flashcardRoutes = require("./routes/flashcardRoutes.js")
const flashcardVoteRoutes = require("./routes/flashcardVoteRoutes.js")
const searchRoutes = require("./routes/searchRoutes.js")


// Connect to MongoDB asynchronously
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.URI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1) // Exit the process if unable to connect
  }
}


// Use the routes in your app
app.use("/auth", routes.authRoutes)
app.use("/users", routes.userRoutess)
app.use("/decks", routes.deckRoutes)
app.use("/decksvote", routes.deckVoteRoutes)
app.use("/flashcards", routes.flashcardRoutes)
app.use("/flashcardsvote", routes.flashcardVoteRoutes)
app.use("/search",routes.searchRoutes)

// Start the server after connecting to MongoDB
const startServer = async () => {
  try {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    // Log the error and do not exit the process
  }
}

// Call the asynchronous functions
connectToMongoDB().then(startServer)

//Export app module for test
module.exports = app;