    const {mongoose} = require('../utils/import')

    const deckSchema =  mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            unique : true
          },
          description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 200
          },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          createdAt: {
            type: Date,
            default: Date.now
          },
          owner : {
            type : Boolean
          },
          visibility: {
            type: String,
            enum: ['private', 'public'],
            default: 'private'
          }
    })

    const Deck =  mongoose.model('Deck', deckSchema)

    module.exports = { Deck }