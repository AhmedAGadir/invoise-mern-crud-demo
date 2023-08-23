const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc GET users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({}).sort({ createdAt: -1 });
	res.status(200).json(users);
});

// @desc Set user
// @route POST /api/users
// @access Public
const setUser = asyncHandler(async (req, res) => {
	if (
		!req.body.name ||
		!req.body.email ||
		!req.body.avatarUrl ||
		!req.body.invoiceNumber ||
		!req.body.issueDate ||
		!req.body.dueDate ||
		!req.body.amount ||
		!req.body.currency ||
		!req.body.status
	) {
		console.log("[setUser] Invalid user data".red.bold);
		res.status(400);
		throw new Error("Invalid user data");
	}

	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		avatarUrl: req.body.avatarUrl,
		invoiceNumber: req.body.invoiceNumber,
		issueDate: req.body.issueDate,
		dueDate: req.body.dueDate,
		amount: req.body.amount,
		currency: req.body.currency,
		status: req.body.status,
	});

	console.log(
		`[setUser] timstamp: ${user.createdAt}, user created: ${JSON.stringify(
			user
		)}`.bgMagenta.bold
	);

	res.status(200).json(user);
});

// @desc Update user
// @route PUT /api/users/:id
// @access Public
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}
	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedUser);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}
	console.log(
		`[deleteUser] deleting user with id ${req.params.id}: `.red.bold,
		JSON.stringify(user)
	);

	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ id: req.params.id });
});

// @desc Delete users
// @route DELETE /api/users
// @access Public
const deleteUsers = asyncHandler(async (req, res) => {
	await User.deleteMany({});
	res.status(200).json({ message: "Users deleted" });
});

// @desc Reset users
// @route GET /api/users/reset
// @access Public
const resetUsers = asyncHandler(async (req, res) => {
	await User.deleteMany({});
	const users = require("../config/users.json");

	// doesn't work as timestamps arent in array order
	// await User.insertMany(users.reverse());

	// // add users one by one to get timestamps
	for await (const user of users.reverse()) {
		await User.create(user);
	}
	// reverse back to display in UI
	res.status(200).json(users.reverse());
});

module.exports = {
	getUsers,
	setUser,
	updateUser,
	deleteUser,
	deleteUsers,
	resetUsers,
};
