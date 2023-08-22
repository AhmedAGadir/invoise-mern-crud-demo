import { ICellRendererParams } from "ag-grid-community";
import Image from "react-bootstrap/Image";
import { User } from "../../../types";

import styles from "./AvatarRenderer.module.css";

const AvatarRenderer = (params: ICellRendererParams<User>) => (
	<div className={styles.avatar}>
		<Image
			src={params.value}
			width={50}
			height={50}
			roundedCircle
			className="object-fit-cover"
		/>
	</div>
);

export default AvatarRenderer;
