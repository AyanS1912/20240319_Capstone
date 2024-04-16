/**
 * Controller functions for user authentication.
 * @module authControllers
 */

// internal imports
const schema = require('../schema')
const { User }  = schema.User
const jwt  = require("jsonwebtoken")
const { verifyPassword } = require("../utils/authUtil")
const { hashPassword } = require("../utils/authUtil")
const validator = require('../validators')
const { isValidUsername, isValidEmail, isValidPassword } = validator.userValidator

/**
 * Registers a new user with the provided username, email, and password.
 * @param {Object} req - The request object containing user data including username, email, and password.
 * @param {Object} res - The response object used to send a response.
 * @returns {Object} Returns a response indicating success or failure of the registration process.
 */
const register = async (req, res) => {
    try {

        const { username, email, password } = req.body

        // Check if username, email, and password are valid
        if (!isValidUsername(username)) {
            return res.status(400).send({
                message:
                    "Invalid username. Username must contain only letters, numbers, underscores, and hyphens, and be between 3 to 20 characters long.",
            })
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ message: "Invalid email address." })
        }

        if (!isValidPassword(password)) {
            return res.status(400).send({
                message: "Invalid password. Password must be at least 6 characters long.",
            })
        }

        if (!password) {
            return res.status(400).send({ message: "Password is required." })
        }
        // Check if username and email already exist
        const usernameExist = await User.findOne({ username: username })
        const emailExist = await User.findOne({ email: email })

        if (usernameExist) {
            return res.status(401).send({
                message: "Username already exists. Please try another Username.",
            })
        }

        if (emailExist) {
            return res
                .status(401)
                .send({ message: "Email already exists. Please try another email." })
        }
        // Hash the password
        const hashedPassword = await hashPassword(password)
        // Create a new user
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        })

        return res.status(201).send({ message: "New user registered successfully.", user: newUser })
    }
    catch (error) {
        console.error(error)
        return res.status(500).send({ error: "Failed to register new user." })
    }
}


/**
 * Logs in a user with the provided username and password.
 * @param {Object} req - The request object containing user credentials including username and password.
 * @param {Object} res - The response object used to send a response.
 * @returns {Object} Returns a response containing JWT token if login is successful.
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body
        // Check if the password is correct
        const user = await User.findOne({ username: username })

        if (!user) {
            return res.status(404).send({ message: "Username doesn't exist. Please enter the right username." })
        }
        const checkPassword = await verifyPassword(user, password)

        if (!checkPassword) {
            return res.status(401).send({ message: "Incorrect password." })
        }

        // User is authenticated, create JWT token
        const accessToken = jwt.sign(
            { username: user.username, userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "23h" }
        )

        res.set("Authorization", "Bearer " + accessToken)
        return res.status(200).send({ token: "Bearer " + accessToken, message: "User logged in successfully." })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: "Failed to login. Try again." })
    }
}

/**
 * Verifies the validity of the JWT token.
 * @param {Object} req - The request object containing the JWT token.
 * @param {Object} res - The response object used to send a response.
 * @returns {Object} Returns a response indicating whether the token is valid or not.
 */
const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).send({ message: "No token provided." });
        }
        
        jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid token." });
            }

            return res.status(200).send({ isValid: true });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Failed to verify token." });
    }
}

// exports
module.exports = { register, login, verifyToken}
