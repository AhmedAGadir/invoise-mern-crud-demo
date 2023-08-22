import { ColDef } from "ag-grid-community";
import { User } from "./types";
import AvatarRenderer from "./components/CellRenderers/AvatarRenderer/AvatarRenderer";
import StatusRenderer from "./components/CellRenderers/StatusRenderer/StatusRenderer";
import ActionsRenderer from "./components/CellRenderers/ActionsRenderer/ActionsRenderer";
import clsx from "clsx";
import styles from "./colDef.module.css";

export const getColDefs = (
	addUser?: (user: User) => void,
	updateUser?: (user: User) => void,
	deleteUser?: (user: User) => void
): ColDef<User>[] => [
	{
		headerName: "",
		field: "avatarUrl",
		maxWidth: 75,
		cellRenderer: AvatarRenderer,
	},
	{ headerName: "Client", field: "name", minWidth: 180 },
	// { field: 'email' },
	{ headerName: "Invoice", field: "invoiceNumber" },
	{
		field: "issueDate",
		headerClass: clsx("ag-right-aligned-header", styles["invoise-header"]),
		cellClass: "ag-right-aligned-cell",
	},
	{
		field: "dueDate",
		headerClass: clsx("ag-right-aligned-header", styles["invoise-header"]),
		cellClass: "ag-right-aligned-cell",
	},
	{
		field: "amount",
		headerClass: clsx("ag-right-aligned-header", styles["invoise-header"]),
		cellClass: "ag-right-aligned-cell",
		valueFormatter: ({ value, data }) => {
			return value.toLocaleString("en-US", {
				style: "currency",
				currency: data?.currency || "USD",
			});
		},
	},
	{ field: "status", cellRenderer: StatusRenderer },
	{
		headerName: "actions",
		cellRenderer: ActionsRenderer,
		cellRendererParams: { addUser, updateUser, deleteUser },
	},
];
