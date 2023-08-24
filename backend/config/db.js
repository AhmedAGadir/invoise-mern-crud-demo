const mongoose = require("mongoose");

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
};

const closeDB = async () => {
	await mongoose.connection.close();
};

module.exports = {
	connectDB,
	closeDB,
};
