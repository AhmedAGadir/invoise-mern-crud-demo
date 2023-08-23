const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		avatarUrl: {
			type: String,
			required: true,
		},
		invoiceNumber: {
			type: String,
			required: true,
		},
		issueDate: {
			type: String,
			required: true,
		},
		dueDate: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
