import { ColDef, SetFilterValuesFuncParams } from "ag-grid-community";
import { User } from "../../types";
import AvatarRenderer from "../CellRenderers/AvatarRenderer/AvatarRenderer";
import StatusRenderer from "../CellRenderers/StatusRenderer/StatusRenderer";
import ActionsRenderer from "../CellRenderers/ActionsRenderer/ActionsRenderer";
import { ServerSideDataSource } from "./serverSideDataSource";

import clsx from "clsx";
import styles from "./colDef.module.css";

export const getColDefs = (
	serverSideDataSource: ServerSideDataSource,
	updateUser: (user: User) => void,
	deleteUser: (user: User) => void
): ColDef<User>[] => [
	{
		headerName: "",
		field: "avatarUrl",
		maxWidth: 75,
		cellRenderer: AvatarRenderer,
		resizable: false,
	},
	{
		headerName: "Client",
		field: "name",
		minWidth: 180,
		filter: "agTextColumnFilter",
		filterParams: {
			// only contains to keep this simple
			filterOptions: ["contains"],
		},
		sortable: true,
		menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
	},
	{
		headerName: "Invoice",
		field: "invoiceNumber",
		filter: "agTextColumnFilter",
		filterParams: {
			// only contains to keep this simple
			filterOptions: ["contains"],
		},
		sortable: true,
		menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
	},
	{
		field: "issueDate",
		minWidth: 140,
		headerClass: clsx("ag-right-aligned-header", styles["invoise-header"]),
		cellClass: "ag-right-aligned-cell",
	},
	{
		field: "dueDate",
		minWidth: 140,
		headerClass: clsx("ag-right-aligned-header", styles["invoise-header"]),
		cellClass: "ag-right-aligned-cell",
	},
	{
		field: "amount",
		minWidth: 125,
		headerClass: clsx("ag-right-aligned-header", styles["invoise-header"]),
		cellClass: "ag-right-aligned-cell",
		valueFormatter: ({ value, data }) => {
			return value.toLocaleString("en-US", {
				style: "currency",
				currency: data?.currency || "USD",
			});
		},
		filter: "agNumberColumnFilter",
		filterParams: {
			filterOptions: ["equals", "lessThan", "greaterThan"],
		},
		sortable: true,
		menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
	},
	{
		field: "status",
		minWidth: 120,
		cellRenderer: StatusRenderer,
		filter: "agSetColumnFilter",
		filterParams: {
			values: async ({ success }: SetFilterValuesFuncParams<User>) => {
				try {
					const values = await serverSideDataSource.getFilterValues("status");
					success(values);
				} catch (error) {
					console.error(error);
					return [];
				}
			},
		},
		menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
	},
	{
		headerName: "actions",
		cellRenderer: ActionsRenderer,
		cellRendererParams: { updateUser, deleteUser },
		minWidth: 150,
		maxWidth: 150,
	},
];
