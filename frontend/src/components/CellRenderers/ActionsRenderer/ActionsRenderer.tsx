import {
	BsPencilSquare,
	BsFillEyeFill,
	BsFillTrash3Fill,
} from "react-icons/bs";
import { ICellRendererParams } from "ag-grid-community";
import { User } from "../../../types";

import styles from "./ActionsRenderer.module.css";

const ActionsRenderer = (
	params: ICellRendererParams<User> & {
		updateUser: (user: User) => void;
		deleteUser: (user: User) => void;
	}
) => {
	const user = params.data as User;
	return (
		<div className={styles["action-wrap"]}>
			<span className={styles.action} onClick={() => params.updateUser(user)}>
				<BsPencilSquare size={18} />
			</span>
			<span
				className={styles.action}
				onClick={() => {
					alert("PREVIEW");
				}}
			>
				<BsFillEyeFill size={18} />
			</span>
			<span className={styles.action} onClick={() => params.deleteUser(user)}>
				<BsFillTrash3Fill size={18} />
			</span>
		</div>
	);
};

export default ActionsRenderer;
