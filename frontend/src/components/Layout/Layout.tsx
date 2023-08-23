import React from "react";
import Navbar from "../Navbar/Navbar";
import clsx from "clsx";
import styles from "./Layout.module.css";
import { Container } from "react-bootstrap";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={clsx(styles.layout, "h-100", "d-flex", "flex-column")}>
			<Navbar />
			<Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center h-100">
				{children}
			</Container>
		</div>
	);
};

export default Layout;
