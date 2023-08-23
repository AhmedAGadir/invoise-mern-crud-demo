const express = require("express");
const router = express.Router();
const {
	getUsers,
	setUser,
	updateUser,
	deleteUser,
	deleteUsers,
	resetUsers,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", setUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.delete("/", deleteUsers);

router.get("/reset", resetUsers);

module.exports = router;
