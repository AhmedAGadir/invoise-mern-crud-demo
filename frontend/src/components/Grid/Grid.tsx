import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridReadyEvent, ColDef } from "ag-grid-community";
import { getColDefs } from "../../colDefs";
import { User } from "../../types";

import clsx from "clsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styles from "./Grid.module.css";

type GridProps = {
	users: User[];
	addUser: () => void;
	updateUser: (user: User) => void;
	deleteUser: (user: User) => void;
};

const Grid = ({ users, addUser, updateUser, deleteUser }: GridProps) => {
	const colDefs = useMemo(
		() => getColDefs(addUser, updateUser, deleteUser),
		[addUser, updateUser, deleteUser]
	);

	const defaultColDef: ColDef = useMemo(() => {
		return {
			flex: 1,
			minWidth: 100,
			headerClass: styles["invoise-header"],
			resizable: true,
			lockPosition: true,
		};
	}, []);

	const onGridReady = useCallback((params: GridReadyEvent) => {
		const gridApi = params.api;
		const gridColumnApi = params.columnApi;

		gridApi.sizeColumnsToFit();
	}, []);

	return (
		<div className={clsx("ag-theme-alpine-dark", styles["ag-theme-invoise"])}>
			<AgGridReact
				rowData={users}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				onGridReady={onGridReady}
				rowHeight={75}
			/>
		</div>
	);
};

export default Grid;
