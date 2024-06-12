const { User } = require('../Models');
const mongoose = require('mongoose');


// Get all Users
const getAllUsers = async (req, res) => {
    try
    {
        const users = await User.find({});
        res.send(users);
    }catch (error) {
        res.status(500).json({ message: error.message });

    }
}
// Get User by ID
const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ message: error.message });

    }
};
// Delete a User
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json({ message: 'User successfully deleted' });

    }catch (error){
        res.status(500).json({ message: error.message });
    }
;}
// Update a User
const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Register a new User
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Log in User
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // User successfully logged in
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Log out User
const logout = async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    getAllUsers,
    register,
    login,
    logout,
    getUserById,
    deleteUser,
    updateUser
}