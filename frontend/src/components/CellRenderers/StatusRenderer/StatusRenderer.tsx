import { ICellRendererParams } from "ag-grid-community";
import { User } from "../../../types";
import clsx from "clsx";
import styles from "./StatusRenderer.module.css";

const StatusRenderer = (params: ICellRendererParams<User>) => {
	console.log("params", params);
	switch (params.value.toLowerCase()) {
		case "paid":
			return (
				<span
					className={clsx(
						"badge",
						"rounded-pill",
						"text-bg-success",
						styles.statusBadge
					)}
				>
					Paid
				</span>
			);
		case "pending":
			return (
				<span
					className={clsx(
						"badge",
						"rounded-pill",
						"text-bg-warning",
						styles.statusBadge
					)}
				>
					Pending
				</span>
			);
		case "unpaid":
			return (
				<span
					className={clsx(
						"badge",
						"rounded-pill",
						"text-bg-danger",
						styles.statusBadge
					)}
				>
					Unpaid
				</span>
			);
		default:
			return (
				<span
					className={clsx(
						"badge",
						"rounded-pill",
						"text-bg-secondary",
						styles.statusBadge
					)}
				>
					unknown
				</span>
			);
	}
};

export default StatusRenderer;
