const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

/**
 * Hashes the provided password using bcrypt.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(password, salt)
}

/**
 * Verifies if the provided password matches the hashed password of the user.
 * @param {Object} user - The user object containing the hashed password.
 * @param {string} password - The password to be verified.
 * @returns {Promise<boolean>} A promise that resolves to true if the password is verified, false otherwise.
 */
async function verifyPassword(user, password) {
  return await bcrypt.compare(password, user.password)
}

/**
 * Decodes the provided JWT token.
 * @param {string} token - The JWT token to be decoded.
 * @returns {Object} The decoded token payload.
 */
function decodeToken(token) {
  const decodedToken = token.split(" ")[1]
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { hashPassword, verifyPassword, decodeToken }
