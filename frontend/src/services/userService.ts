import axios from "axios";
import { User } from "../types";

const URL = "api/users/";

const getAllUsers = () =>
	axios
		.get(URL)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
			throw error;
		});

const addUser = (user: User) =>
	axios
		.post(URL, user)
		.then((response) => response.data as User)
		.catch((error) => {
			console.log(error);
			throw error;
		});

const updateUser = (user: User) =>
	axios
		.put(URL + user._id, user)
		.then((response) => response.data as User)
		.catch((error) => {
			console.log(error);
			throw error;
		});

const deleteUser = (user: User) =>
	axios
		.delete(URL + user._id)
		.then((response) => response.data.id as string)
		.catch((error) => {
			console.log(error);
			throw error;
		});

// method to delete all users
const deleteAllUsers = () =>
	axios
		.delete(URL)
		.then((response) => response.data.message as string)
		.catch((error) => {
			console.log(error);
			throw error;
		});

const resetUsers = () =>
	axios
		.get(URL + "reset")
		.then((response) => response.data as User[])
		.catch((error) => {
			console.log(error);
			throw error;
		});

const userService = {
	getAllUsers,
	addUser,
	updateUser,
	deleteUser,
	deleteAllUsers,
	resetUsers,
};

export default userService;
