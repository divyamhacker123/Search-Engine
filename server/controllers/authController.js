const User = require('../models/User');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "No existing user found. Please create an account by clicking 'Create account'." });
        }
        if (existingUser.password !== password) {
            return res.status(401).json({ message: "Incorrect password. Please try again." });
        }
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = { login, signup };