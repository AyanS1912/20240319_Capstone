  const {mongoose} = require('mongoose');
  const {bcrypt} = require('../utils/auth')
  // Define the user schema
  const userSchema = new mongoose.Schema({
      // Define username field with type, required, unique, minlength, and maxlength constraints
      username: {
          type: String,
          required: true,
          unique: true,
          minlength: 4,
          maxlength: 20
      },
      // Define email field with type, required, unique, and validation constraints
      email: {
          type: String,
          required: true,
          unique: true,
          validate: {
              validator: function (value) {
                  // Regular expression for basic email validation
                  return /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-z]{2,}$/.test(value);
              },
              message: (props) => `${props.value} is not a valid email!`,
          },
      },
      // Define password field with type, required, and minlength constraints
      password: {
          type: String,
          required: true,
          minlength: 6
      },
  })

  const User = mongoose.model("User",userSchema)

  module.exports = { User }


  