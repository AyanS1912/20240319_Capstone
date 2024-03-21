// Load environment variables from .env file
require("dotenv").config()

// Import required modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// Create an Express app
const app = express()
app.use(cors())
// Parse JSON requests
app.use(express.json())
app.use(cors())

// Define routes
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes")
const deckRoutes = require("./routes/deckRoutes.js")
const deckVoteRoutes = require("./routes/deckVoteRoutes.js")
const flashcardRoutes = require("./routes/flashcardRoutes.js")
const flashcardVoteRoutes = require("./routes/flashcardVoteRoutes.js")

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
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/decks", deckRoutes)
app.use("/decksvote", deckVoteRoutes)
app.use("/flashcards", flashcardRoutes)
app.use("/flashcardsvote", flashcardVoteRoutes)

// Start the server after connecting to MongoDB
const startServer = async () => {
  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

// Call the asynchronous functions
connectToMongoDB().then(startServer)
