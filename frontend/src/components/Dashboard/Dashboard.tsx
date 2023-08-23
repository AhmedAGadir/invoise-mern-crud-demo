import React, { useState, useEffect, useCallback } from "react";
import { User, IFormSubmitHandler } from "../../types";
import { getColDefs } from "../../colDefs";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoUsers from "../NoUsers/NoUsers";
import PlaceholderGrid from "../PlaceholderGrid/PlaceholderGrid";
import Grid from "../Grid/Grid";
import UserForm from "../UserForm/UserForm";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { BsFillPlusCircleFill, BsFillTrashFill } from "react-icons/bs";

import userService from "../../services/userService";

const Dashboard = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<User | null>(null);
	const [formSubmitHandler, setFormSubmitHandler] =
		useState<IFormSubmitHandler | null>(null);

	// fetch users from server
	useEffect(() => {
		userService
			.getAllUsers()
			.then((data) => {
				setTimeout(() => {
					setLoading(false);
					setSuccess(true);
					setUsers(data);
				}, 2000);
			})
			.catch(function (error) {
				console.log("error", error);
				setLoading(false);
				setError(true);
			});
	}, []);

	const openForm = useCallback((data: User | null, fn: IFormSubmitHandler) => {
		setFormData(data);
		setFormSubmitHandler(() => fn);
		setShowForm(true);
	}, []);

	const closeForm = useCallback(() => {
		setShowForm(false);
		setFormSubmitHandler(null);
		setFormData(null);
	}, []);

	const addUserHandler = useCallback(() => {
		const addUser = (user: User) => {
			userService
				.addUser(user)
				.then((data) => setUsers((prev) => [data, ...prev]))
				.catch(function (error) {
					console.log("error", error);
				});
		};

		openForm(null, addUser);
	}, [openForm]);

	const updateUserHandler = useCallback(
		(user: User) => {
			const updateUser = (user: User) => {
				userService
					.updateUser(user)
					.then((data) => {
						setUsers((prev) => {
							const index = prev.findIndex((u) => u._id === data._id);
							const newUsers = [...prev];
							newUsers[index] = data;
							return newUsers;
						});
					})
					.catch(function (error) {
						console.log("error", error);
					});
			};

			openForm(user, updateUser);
		},
		[openForm]
	);

	const deleteUserHandler = useCallback((user: User) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			userService
				.deleteUser(user)
				.then((id) => {
					setUsers((prev) => {
						const index = prev.findIndex((u) => u._id === id);
						const newUsers = [...prev];
						newUsers.splice(index, 1);
						return newUsers;
					});
				})
				.catch(function (error) {
					console.log("error", error);
				});
		}
	}, []);

	const deleteAllUsersHandler = useCallback(() => {
		if (window.confirm("Are you sure you want to delete ALL users?")) {
			userService
				.deleteAllUsers()
				.then(() => {
					setUsers([]);
				})
				.catch(function (error) {
					console.log("error", error);
				});
		}
	}, []);

	const resetUsersHandler = useCallback(() => {
		if (window.confirm("Are you sure you want to reset all users?")) {
			userService
				.resetUsers()
				.then((data) => {
					setUsers(data);
				})
				.catch(function (error) {
					console.log("error", error);
				});
		}
	}, []);

	if (error) {
		return <ErrorMessage />;
	}

	if (loading) {
		return <PlaceholderGrid rows={10} columns={getColDefs().length} />;
	}

	return (
		<>
			{success && users.length === 0 ? (
				<NoUsers addUser={addUserHandler} />
			) : (
				<Container>
					<Stack
						direction="horizontal"
						className="mb-3 d-flex align-items-center justify-content-between"
					>
						<div>
							<Button
								className="btn btn-success d-inline-block mx-1"
								onClick={addUserHandler}
							>
								<BsFillPlusCircleFill size={18} /> Add New
							</Button>
							<Button
								className="btn btn-danger d-inline-block mx-1"
								onClick={deleteAllUsersHandler}
							>
								<BsFillTrashFill size={18} /> Delete
							</Button>
						</div>
						<Form>
							<Form.Control type="text" placeholder="Search.." />
						</Form>
					</Stack>
					<Grid
						users={users}
						addUser={addUserHandler}
						updateUser={updateUserHandler}
						deleteUser={deleteUserHandler}
					/>
				</Container>
			)}
			<div>
				<Button
					style={{ letterSpacing: "1px" }}
					className="text-uppercase btn btn-link d-block mt-3 mx-auto"
					onClick={resetUsersHandler}
				>
					reset
				</Button>
			</div>
			{showForm && (
				<UserForm data={formData} submit={formSubmitHandler} hide={closeForm} />
			)}
		</>
	);
};

export default Dashboard;
