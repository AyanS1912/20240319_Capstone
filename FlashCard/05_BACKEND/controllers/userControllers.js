const {User} = require("../schema/userSchema")

const { bcrypt } = require('../utils/auth');

async function createDefaultUser(req, res) {
    try {
        // Check if there are any existing users
        const existingUser = await User.findOne({});
      
        // If no user exists, create a default user
        if (!existingUser) {
            const defaultPassword = "password"; // Set the default password
        
            // Hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(defaultPassword, salt);
        
            // Create the default user
            await User.create({
                username: "ayan",
                email: "ayan@gmail.com",
                password: hashedPassword,
            });

            res.status(201).json({ message: 'Default user created successfully.' });
        } else {
            res.status(200).json({ message: 'User already exists.' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createDefaultUser };