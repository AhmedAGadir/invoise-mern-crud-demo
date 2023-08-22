const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
    },
    avatarUrl: {
        type: String,
        required: [true, 'Please enter an avatarUrl'],
    },
    invoiceNumber: {
        type: String,
        required: [true, 'Please enter an invoiceNumber'],
    },
    issueDate: {
        type: String,
        required: [true, 'Please enter an issueDate'],
    },
    dueDate: {
        type: String,
        required: [true, 'Please enter a dueDate'],
    },
    amount: {
        type: Number,
        required: [true, 'Please enter an amount'],
    },
    currency: {
        type: String,
        required: [true, 'Please enter a currency'],
    },
    status: {
        type: String,
        required: [true, 'Please enter a status'],
    },
}, {
    timeStamps: true,
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
