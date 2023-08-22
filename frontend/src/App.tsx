import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Layout from "./components/Layout/Layout";
import Grid from "./components/Grid/Grid";
import PlaceholderGrid from "./components/PlaceholderGrid/PlaceholderGrid";
import NoUsers from "./components/NoUsers/NoUsers";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import { User, IFormSubmitHandler } from "./types";
import { getColDefs } from "./colDefs";

import { Container } from "react-bootstrap";

import "./App.module.css";

function App() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<User | null>(null);
	const [formSubmitHandler, setFormSubmitHandler] =
		useState<IFormSubmitHandler | null>(null);

	// fetch users from server
	useEffect(() => {
		axios
			.get("api/users/")
			.then((res) => res.data)
			.then((data) => {
				setTimeout(() => {
					setUsers(data);
					setLoading(false);
					setSuccess(true);
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

	const addUser = useCallback((user: User) => {
		alert("adding user: " + JSON.stringify(user));
		// setUsers((prev) => [...prev, user]);
	}, []);

	const updateUser = useCallback((user: User) => {
		alert("updating user: " + JSON.stringify(user));
		// setUsers((prev) => [...prev, user]);
	}, []);

	const deleteUser = useCallback((user: User) => {
		alert("deleting user: " + JSON.stringify(user));
		// setUsers((prev) => [...prev, user]);
	}, []);

	const addUserHandler = useCallback(() => {
		openForm(null, addUser);
	}, [addUser, openForm]);

	const updateUserHandler = useCallback(
		(user: User) => {
			openForm(user, updateUser);
		},
		[openForm, updateUser]
	);

	const deleteUserHandler = useCallback(
		(user: User) => {
			openForm(user, deleteUser);
		},
		[deleteUser, openForm]
	);

	return (
		<Layout>
			<Container className="bg-dark text-white flex-grow-1 d-flex flex-column justify-content-center align-items-center h-100">
				{loading && <PlaceholderGrid rows={15} columns={getColDefs().length} />}
				{error && <ErrorMessage />}
				{success && users.length === 0 ? (
					<NoUsers />
				) : (
					<Grid
						users={users}
						addUser={addUserHandler}
						updateUser={updateUserHandler}
						deleteUser={deleteUserHandler}
					/>
				)}
			</Container>
			{showForm && (
				<div>form</div>
				// <div data={formData} submit={formSubmitHandler} hide={closeForm} />
			)}
		</Layout>
	);
}

export default App;
