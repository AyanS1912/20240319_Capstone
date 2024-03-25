/**
 * Validate deck name format.
 * @param {string} name - The name of the deck.
 * @returns {boolean} Returns true if the name is valid, otherwise false.
 */
const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/
    return nameRegex.test(name)
}

/**
 * Validate deck description format.
 * @param {string} description - The description of the deck.
 * @returns {boolean} Returns true if the description is valid, otherwise false.
 */
const validateDescription = (description) => {
    const descriptionRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/
    return descriptionRegex.test(description)
}

/**
 * Validate deck visibility value.
 * @param {string} visibility - The visibility of the deck.
 * @returns {boolean} Returns true if the visibility value is valid, otherwise false.
 */
const validateVisibility = (visibility) => {
    return visibility === 'private' || visibility === 'public'
}

module.exports = { validateName, validateDescription, validateVisibility }