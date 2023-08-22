const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const initUsersCollection = async () => {
    const users = require('./users.json');
    const User = require('../models/userModel');
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Users collection initialised'.yellow);
};

module.exports = {
    connectDB,
    initUsersCollection
};