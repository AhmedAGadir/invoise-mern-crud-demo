import {
	ColDef,
	SetFilterValuesFuncParams,
	ValueFormatterParams,
	ValueGetterParams,
} from "ag-grid-community";
import { User } from "../../types";
import AvatarRenderer from "../CellRenderers/AvatarRenderer/AvatarRenderer";
import StatusRenderer from "../CellRenderers/StatusRenderer/StatusRenderer";
import ActionsRenderer from "../CellRenderers/ActionsRenderer/ActionsRenderer";
import { ServerSideDataSource } from "./serverSideDataSource";

import clsx from "clsx";
import styles from "./colDef.module.css";
import { Currency } from "../../currencies";
import { ExchangeRate } from "../../hooks/useCurrencyExchange";

export const getColDefs = (
	serverSideDataSource: ServerSideDataSource,
	updateUser: (user: User) => void,
	deleteUser: (user: User) => void,
	selectedCurrency: Currency | undefined,
	exchangeRate: ExchangeRate
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
		valueGetter: ({ data }: ValueGetterParams<User>) => {
			if (!data) return;
			if (!selectedCurrency) return data.amount;
			const exchangeMultiplier = exchangeRate[data.currency] as number;
			const exchangedAmount = data.amount / exchangeMultiplier;
			// return to 2 decimal places
			return Math.round(exchangedAmount * 100) / 100;
		},
		valueFormatter: ({ value, data }: ValueFormatterParams<User, number>) =>
			value?.toLocaleString("en-US", {
				style: "currency",
				currency: selectedCurrency ?? (data?.currency || "USD"),
			}) ?? "",
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
