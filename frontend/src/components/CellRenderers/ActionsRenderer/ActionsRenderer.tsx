import {
	BsPencilSquare,
	BsFillEyeFill,
	BsFillTrash3Fill,
} from "react-icons/bs";

import styles from "./ActionsRenderer.module.css";

const ActionsRenderer = () => {
	return (
		<div className={styles["action-wrap"]}>
			<span className={styles.action}>
				<BsPencilSquare size={18} />
			</span>
			<span className={styles.action}>
				<BsFillEyeFill size={18} />
			</span>
			<span className={styles.action}>
				<BsFillTrash3Fill size={18} />
			</span>
		</div>
	);
};

export default ActionsRenderer;
