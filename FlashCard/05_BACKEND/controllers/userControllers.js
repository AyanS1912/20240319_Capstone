const { User } = require("../schema/userSchema");
const { hashPassword } = require("../utils/utility");
const { token_provided, verifyToken } = require("../validators/tokenValidator");


//Get the information of specific User
const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }

    const decodedToken = await verifyToken(token);
    console.log(decodedToken);
    if (!decodedToken) {
      return res
        .status(403)
        .send({ message: "Forbidden. Only users can perform this action." });
    }

    const userExist = await User.findOne({ username: decodedToken.username });

    if (!userExist) {
      return res.status(404).send({ error: "User not Found." });
    }


    return res.status(200).send(userExist);
  } 
  catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Failed to retrieve data." });
  }
};

// Update the user's information
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }

    const decodedToken = verifyToken(token);
    // console.log(decodedToken.userId)
    const requestbyUser = await User.findById(decodedToken.userId)

    if (requestbyUser._id.toString() !== id) {
      return res.status(403).send({
        error: "Access denied. You are not authorized to update this user.",
      });
    }

    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.username) {
      userToUpdate.username = req.body.username;
    }

    if (req.body.email) {
      userToUpdate.email = req.body.email;
    }

    if (req.body.password) {
      const hashedPassword = await hashPassword(req.body.password);
      userToUpdate.password = hashedPassword;
    }

    const updatedUser = await userToUpdate.save();
    res
      .status(200)
      .json({ message: "User details updated", user_details: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user details" });
  }
};

// DELETE existing users
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }

    const decodedToken = verifyToken(token);
    const requestbyUser = await User.findOne({
      username: decodedToken.username,
    });

    if (!requestbyUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (requestbyUser._id.toString() !== id) {
      return res.status(403).json({
        error: "Access denied. You are not authorized to delete this user.",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// exports
module.exports = { getUser, updateUser, deleteUser };
