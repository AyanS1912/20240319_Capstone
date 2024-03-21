  const { decode } = require("punycode");
  const { jwt } = require("../utils/auth");
  const { decodeToken } = require("../utils/utility");
  require("dotenv").config();

  /**
   * Function to verify weather toke exists or not
   * @param {string} token
   * @returns
   */
  function token_provided(token) {
    if (!token) {
      return false;
    } else {
      return true;
    }
  }


  function verifyToken(token) {
    try {
      const decodetoken = token; // remove 'Bearer' from token
      const decode = jwt.verify(decodetoken.split(" ")[1], process.env.SECRET_KEY);
      return decode;
    } 
    catch (err) {
      console.error(err);
      return false;
    }
  }

  module.exports = { token_provided, verifyToken };
