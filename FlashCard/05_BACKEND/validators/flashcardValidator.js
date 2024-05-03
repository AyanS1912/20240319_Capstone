/**
 * Validate if body provided or not.
 * @param {string} body - The body of the flashcard.
 * @returns {boolean} Returns true if the body is provided, otherwise false.
 */
const validateBody = (body) => {
    let missing = []
    if(body.frontText ===  ''){
        missing.push('frontText')
    }
    
    if(body.backText === ''){
        missing.push('backText')
    }
    
    if(body.tags.length === 0){
        missing.push('tags')
    }

    if(body.visibility === ''){
        missing.push('Visibility')
    }
    
    if(!(missing.length === 0)){
        return { test: false, message : ` Flashcard is missing data like ${missing}`}
    }

    return {test : true}
}


/**
 * Validate front text format.
 * @param {string} frontText - The front text of the flashcard.
 * @returns {boolean} Returns true if the front text is valid, otherwise false.
 */
const validateFrontText = (frontText) => {
    // Validate character length
    if (frontText.length < 3 || frontText.length > 200) {
        return false
    }
    return true
}


/**
 * Validate back text format.
 * @param {string} backText - The back text of the flashcard.
 * @returns {boolean} Returns true if the back text is valid, otherwise false.
 */
const validateBackText = (backText) => {
    // Validate character length
    if (backText.length < 3 || backText.length > 500) {
        return false
    }
    return true
}


/**
 * Validate tags format.
 * @param {string[]} tags - The tags of the flashcard.
 * @returns {boolean} Returns true if the tags are valid, otherwise false.
 */
const validateTags = (tags) => {
    // Add specific validation rules for the tags.
    return tags.every(tag => /^[a-zA-Z0-9]+$/.test(tag)) // Ensure each tag is alphanumeric.
}

/**
 * Validate visibility value.
 * @param {string} visibility - The visibility of the flashcard.
 * @returns {boolean} Returns true if the visibility value is valid, otherwise false.
 */
const validateVisibility = (visibility) => {
    return visibility === 'private' || visibility === 'public'
}

module.exports = {
    validateBody,
    validateFrontText,
    validateBackText,
    validateTags,
    validateVisibility
}