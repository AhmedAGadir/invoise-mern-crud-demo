const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc GET users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc Set user
// @route POST /api/users
// @access Public
const setUser = asyncHandler(async (req, res) => {
    if (
        !req.body.name || !req.body.email || !req.body.avatarUrl 
        || !req.body.invoiceNumber || !req.body.issueDate 
        || !req.body.dueDate || !req.body.amount || !req.body.currency 
        || !req.body.status) {
        res.status(400);
        throw new Error('Invalid user data');
    }

    const user = await User.create(req.body);

    res.status(200).json(user);
});

// @desc Update user
// @route PUT /api/users/:id
// @access Public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    await User.findByIdAndUpdate(req.params.id, req.body, {new: true, });
    res.status(200).json(updatedGoal);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id});
});

module.exports = { getUsers, setUser, updateUser, deleteUser };
