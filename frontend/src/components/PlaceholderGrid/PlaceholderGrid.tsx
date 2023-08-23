import { clsx } from "clsx";
import styles from "./PlaceholderGrid.module.css";

const PlaceholderGrid = ({
	rows = 5,
	columns = 6,
}: {
	rows?: number;
	columns?: number;
}) => {
	return (
		<div
			className={clsx(
				"bg-primary",
				"container",
				"card",
				"d-flex",
				"flex-column",
				styles["placeholder-grid"]
			)}
		>
			<div className={clsx("row", "placeholder-glow", styles["header-row"])}>
				{Array.from({ length: columns }).map((_, ind) => (
					// shouldn't normally use index as key but nothing else to use here
					<div className="col p-2" key={ind}>
						<div className={clsx("placeholder", styles.header)}></div>
					</div>
				))}
			</div>
			{Array.from({ length: rows }).map((_, ind) => (
				// shouldn't normally use index as key but nothing else to use here
				<div
					className={clsx(styles["variable-row"], "row", "placeholder-glow")}
					key={ind}
				>
					<div className="col p-2">
						<div className={clsx("placeholder", styles.cell)}></div>
					</div>
					{Array.from({ length: columns - 1 }).map((_, ind) => (
						// shouldn't normally use index as key but nothing else to use here
						<div className="col p-2" key={ind}>
							<div className={clsx("placeholder", styles.cell)}></div>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default PlaceholderGrid;
