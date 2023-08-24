const express = require("express");
const router = express.Router();
const {
	getUsers,
	setUser,
	updateUser,
	deleteUser,
	deleteUsers,
	resetUsers,
	getValues,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", setUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.delete("/", deleteUsers);

router.get("/reset", resetUsers);

router.get("/values/:field", getValues);

module.exports = router;
