import React, { useMemo, useCallback, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
	GridReadyEvent,
	ColDef,
	GetRowIdParams,
	GridApi,
} from "ag-grid-community";
import { getColDefs } from "./colDefs";
import { User } from "../../types";
import createServerSideDataSource from "./serverSideDataSource";
import PlaceholderGrid from "../PlaceholderGrid/PlaceholderGrid";
import UserForm, { IFormSubmitHandler } from "../UserForm/UserForm";
import createUserService from "../../services/userService";
import { Container } from "react-bootstrap";
import GridControls from "../GridControls/GridControls";
import { Status } from "../../types";
import useCurrencyExchange from "../../hooks/useCurrencyExchange";

import clsx from "clsx";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styles from "./Grid.module.css";

const Grid = () => {
	const gridApiRef = useRef<GridApi>();

	// used to show the placeholder grid while the first data is being fetched
	const [firstDataFetched, setFirstDataFetched] = React.useState(false);

	// used to communicate with the backend when adding/updating/deleting users
	const userService = useMemo(() => createUserService(), []);

	// used to fetch gridRows and filter values from the backend
	const serverSideDataSource = useMemo(
		() =>
			createServerSideDataSource(userService, () => setFirstDataFetched(true)),
		[userService]
	);

	// used to show add/update user form
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<User | null>(null);
	const [formSubmitHandler, setFormSubmitHandler] =
		useState<IFormSubmitHandler | null>(null);

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

	const addUser = useCallback(() => {
		const add = (user: User) => {
			userService
				.addUser(user)
				.then(() => gridApiRef.current?.refreshServerSide())
				.catch(function (error) {
					console.log("error", error);
				});
		};

		openForm(null, add);
	}, [openForm, userService]);

	const updateUser = useCallback(
		(user: User) => {
			const update = (user: User) => {
				userService
					.updateUser(user)
					.then(() => gridApiRef.current?.refreshServerSide())
					.catch(function (error) {
						console.log("error", error);
					});
			};

			openForm(user, update);
		},
		[openForm, userService]
	);

	const deleteUser = useCallback(
		(user: User) => {
			if (window.confirm("Are you sure you want to delete this user?")) {
				userService
					.deleteUser(user)
					.then(() => gridApiRef.current?.refreshServerSide())
					.catch(function (error) {
						console.log("error", error);
					});
			}
		},
		[userService]
	);

	const deleteAllUsers = useCallback(() => {
		if (window.confirm("Are you sure you want to delete ALL users?")) {
			userService
				.deleteAllUsers()
				.then(() => gridApiRef.current?.refreshServerSide({ purge: true }))
				.catch(function (error) {
					console.log("error", error);
				});
		}
	}, [userService]);

	const resetUsers = useCallback(() => {
		if (window.confirm("Are you sure you want to reset all users?")) {
			userService
				.resetUsers()
				.then(() => gridApiRef.current?.refreshServerSide({ purge: true }))
				.catch(function (error) {
					console.log("error", error);
				});
		}
	}, [userService]);

	// use to display the invoice amounts in the grid in the selected currency
	const { selectedCurrency, setSelectedCurrency, exchangeRate } =
		useCurrencyExchange();

	const colDefs = useMemo(
		() =>
			getColDefs(
				serverSideDataSource,
				updateUser,
				deleteUser,
				selectedCurrency,
				exchangeRate
			),
		[
			serverSideDataSource,
			deleteUser,
			updateUser,
			selectedCurrency,
			exchangeRate,
		]
	);

	const defaultColDef: ColDef = useMemo(
		() => ({
			flex: 1,
			minWidth: 100,
			headerClass: styles["invoise-header"],
			resizable: true,
			lockPosition: true,
			menuTabs: [],
			sortable: false,
			filter: false,
		}),
		[]
	);

	const onGridReady = useCallback((params: GridReadyEvent) => {
		gridApiRef.current = params.api;
		// const gridColumnApi = params.columnApi;

		params.api.sizeColumnsToFit();
	}, []);

	const [filterModel, setFilterModel] = useState<{ [key: string]: any }>({});

	const selectedStatuses: Status[] | undefined = useMemo(
		() => filterModel["status"]?.values,
		[filterModel]
	);

	const onStatusFilterChange = useCallback(
		(statuses: Status[]) => {
			const updatedFilterModel = { ...filterModel };

			if (statuses.length > 0) {
				updatedFilterModel["status"] = {
					filterType: "set",
					type: "equals",
					values: statuses,
				};
			} else {
				delete updatedFilterModel["status"];
			}

			gridApiRef.current?.setFilterModel(updatedFilterModel);
			gridApiRef.current?.onFilterChanged();
		},
		[gridApiRef, filterModel]
	);

	const onGridFilterChange = useCallback(() => {
		const filterModel = gridApiRef.current?.getFilterModel() || {};
		setFilterModel(filterModel);
	}, []);

	return (
		<Container>
			<GridControls
				addUser={addUser}
				deleteAllUsers={deleteAllUsers}
				resetUsers={resetUsers}
				selectedStatuses={selectedStatuses}
				onStatusFilterChange={onStatusFilterChange}
				selectedCurrency={selectedCurrency}
				onCurrencyChange={setSelectedCurrency}
				disabled={!firstDataFetched}
			/>
			<div
				className={clsx(
					"position-relative",
					"ag-theme-alpine-dark",
					styles["ag-theme-invoise"]
				)}
			>
				<AgGridReact
					columnDefs={colDefs}
					defaultColDef={defaultColDef}
					onGridReady={onGridReady}
					rowHeight={75}
					rowModelType="serverSide"
					serverSideDatasource={serverSideDataSource}
					getRowId={(params: GetRowIdParams<User>) => params.data._id}
					onFilterChanged={onGridFilterChange}
				/>
				{!firstDataFetched && (
					<div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
						<PlaceholderGrid rows={10} columns={colDefs.length} />
					</div>
				)}
			</div>
			{showForm && (
				<UserForm data={formData} submit={formSubmitHandler} hide={closeForm} />
			)}
		</Container>
	);
};

export default Grid;
