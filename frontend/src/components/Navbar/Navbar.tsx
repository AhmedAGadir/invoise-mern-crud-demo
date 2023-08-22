import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/logos/invoise-logo-horizontal.png";

import { BsEnvelopeFill, BsFillBellFill } from "react-icons/bs";
import avatar from "../../assets/avatar.jpg";
import Image from "react-bootstrap/Image";

import styles from "./Navbar.module.css";

const MyNavbar = () => (
	<NavBar bg="dark" data-bs-theme="dark" className="shadow-lg mb-6">
		<Container className="d-flex justify-content-between">
			{/* logo */}
			<NavBar.Brand href="#home">
				<img
					alt="InVoise Logo"
					src={logo}
					width="150"
					className="d-inline-block align-top"
				/>
			</NavBar.Brand>
			<Nav className="d-flex justify-content-center align-items-center">
				{/* messages */}
				<div className={styles["icon-wrap"]}>
					<div className={styles["notification-on"]} />
					<Nav.Link href="#">
						<BsEnvelopeFill />
					</Nav.Link>
				</div>
				{/* notifications */}
				<div className={styles["icon-wrap"]}>
					<Nav.Link href="#">
						<BsFillBellFill />
					</Nav.Link>
				</div>
				{/* avatar */}
				<Nav.Link href="#">
					<div className={styles.avatar}>
						<Image
							src={avatar}
							width={50}
							height={50}
							roundedCircle
							className="object-fit-cover"
						/>
					</div>
				</Nav.Link>
			</Nav>
		</Container>
	</NavBar>
);

export default MyNavbar;
