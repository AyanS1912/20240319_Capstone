// Function to validation User details Field.

// Validate username format
const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/
    return usernameRegex.test(username)
}

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

// Validate password format
const isValidPassword = (password) => {
    console.log(password)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
    return passwordRegex.test(password)
}

module.exports = { isValidUsername, isValidEmail, isValidPassword }
