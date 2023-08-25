import axios from "axios";
import { IServerSideGetRowsRequest } from "ag-grid-community";
import { User } from "../types";
import qs from "qs";

const URL = "api/users/";

type GetUserParams = Pick<
	IServerSideGetRowsRequest,
	"startRow" | "endRow" | "filterModel" | "sortModel"
>;

const getUsers = (params: GetUserParams) =>
	axios
		.get(URL, {
			params,
			paramsSerializer: (params) => qs.stringify(params),
		})
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

const getFilterValues = (field: string) => {
	return axios
		.get(`${URL}values/${field}`)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
			throw error;
		});
};

export type UserService = {
	getUsers: (params: GetUserParams) => Promise<{ rowData: User[] }>;
	addUser: (user: User) => Promise<User>;
	updateUser: (user: User) => Promise<User>;
	deleteUser: (user: User) => Promise<string>;
	deleteAllUsers: () => Promise<string>;
	resetUsers: () => Promise<User[]>;
	getFilterValues: (field: string) => Promise<string[]>;
};

const createUserService: () => UserService = () => ({
	getUsers,
	addUser,
	updateUser,
	deleteUser,
	deleteAllUsers,
	resetUsers,
	getFilterValues,
});

export default createUserService;
