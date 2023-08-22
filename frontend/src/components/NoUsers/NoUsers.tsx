import React from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import styles from "./NoUsers.module.css";

const NoUsers = () => {
	return (
		<>
			<h2 className="text-center text-secondary">Create a New Invoice</h2>
			<div className={styles["add-invoice"]}>
				<BsPlusSquareFill size={40} />
			</div>
		</>
	);
};

export default NoUsers;
