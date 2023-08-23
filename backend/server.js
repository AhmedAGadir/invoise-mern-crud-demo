const express = require("express");
const colors = require("colors");
const { connectDB, initUsersCollection } = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

// Load environment variables
const env = require("dotenv").config();

// Connect to database
connectDB();
// Initialise users collection
// initUsersCollection();

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`.magenta.bold);
});
