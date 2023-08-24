import { ICellRendererParams } from "ag-grid-community";
import { User } from "../../../types";
import clsx from "clsx";
import styles from "./StatusRenderer.module.css";

const StatusRenderer = (params: ICellRendererParams<User>) => {
	switch (params.value) {
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
					paid
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
					pending
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
					unpaid
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
