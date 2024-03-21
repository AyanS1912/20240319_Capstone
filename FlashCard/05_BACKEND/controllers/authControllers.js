    // internal imports
    const {User} = require("../schema/userSchema");
    const { jwt } = require("../utils/auth");
    const { verifyPassword } = require("../utils/utility");
    const { hashPassword } = require("../utils/utility");
    const { token_provided, verifyToken } = require("../validators/tokenValidator");
    const {isValidEmail,isValidPassword,isValidUsername} = require("../validators/userValidtor")
    const mongoose = require("../utils/import")

    // Register a new user
    const register = async (req, res) => {
        try {

        const { username, email, password } = req.body;
    
        // Check if username, email, and password are valid
        if (!isValidUsername(username)) {
            return res.status(400).json({
            error:
                "Invalid username. Username must contain only letters, numbers, underscores, and hyphens, and be between 3 to 20 characters long.",
            });
        }
    
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email address." });
        }
    
        if (!isValidPassword(password)) {
            return res.status(400).json({
            error: "Invalid password. Password must be at least 6 characters long.",
            });
        }
    
        if (!password) {
            return res.status(400).json({ error: "Password is required." });
        }
        // Check if username and email already exist
        const usernameExist = await User.findOne({ username: username });
        const emailExist = await User.findOne({ email: email });
    
        if (usernameExist) {
            return res.status(401).json({
            error: "Username already exists. Please try another Username.",
            });
        }
    
        if (emailExist) {
            return res
            .status(401)
            .json({ error: "Email already exists. Please try another email." });
        }
        // Hash the password
        const hashedPassword = await hashPassword(password);
        // Create a new user
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
    
        res.status(201).send({ message: "New user registered successfully.", user: newUser });
        } 
        catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to register new user." });
        }
    };
    
    const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the password is correct
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).send({message : "Username doesn't exist. Please enter the right username."})
        }
        const checkPassword = await verifyPassword(user, password);

        if (!checkPassword) {
        return res.status(401).json({ error: "Incorrect password." });
        }

        // User is authenticated, create JWT token
        const accessToken = jwt.sign(
        { username: user.username, userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "23h" }
        );
        
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
        // console.log("Decoded Token:", decoded);
        
        res.set("Authorization", "Bearer " + accessToken);
        res
        .status(200)
        .json({ token: "Bearer "+accessToken, message: "User logged in successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to login. Try again." });
    }
    };

    const logout = (req, res) => {
    try {
        const token = req.headers.authorization; // Extract the JWT token from the request headers
        // Verify if the user has the role of "user"
        if (!token_provided(token)) {
            return res
              .status(401)
              .send({ error: "Access denied. Token not provided." });
          }

        if(!verifyToken(token)){
            return res.status(401).send({messgae : "Logout Failed"})
        }
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: "Failed to logout" });
    }
    };

    // exports
    module.exports = { register, login, logout };
