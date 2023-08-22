import React from "react";
import Navbar from "../Navbar/Navbar";
import clsx from "clsx";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className={clsx(
				styles.layout,
				"h-100",
				"d-flex",
				"flex-column",
				"bg-dark"
			)}
		>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
