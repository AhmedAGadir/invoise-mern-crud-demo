import React, { useMemo, useCallback } from "react";
import { Stack, Button, ButtonGroup, Form } from "react-bootstrap";
import { Status, StatusEnum } from "../../types";

type GridControlProps = {
	addUser: () => void;
	deleteAllUsers: () => void;
	resetUsers: () => void;
	selectedStatuses: Status[] | undefined;
	onStatusFilterChange: (status: Status[]) => void;
	disabled: boolean;
};

const GridControls = ({
	addUser,
	deleteAllUsers,
	resetUsers,
	selectedStatuses,
	onStatusFilterChange,
	disabled,
}: GridControlProps) => {
	const buttonStyle = useMemo(() => ({ width: 100, letterSpacing: 1 }), []);

	const onSelectedStatusChanged = useCallback(
		(status: Status) => {
			let updatedStatuses;
			if (selectedStatuses === undefined) {
				// if nothing is selected, initialise to status
				updatedStatuses = [status];
			} else {
				updatedStatuses = selectedStatuses.includes(status)
					? selectedStatuses.filter((s) => s !== status)
					: [...selectedStatuses, status];
			}
			console.log("updated status", updatedStatuses);

			onStatusFilterChange(updatedStatuses);
		},
		[onStatusFilterChange, selectedStatuses]
	);

	return (
		<Stack
			direction="horizontal"
			className="mb-3 d-flex align-items-end justify-content-between"
		>
			<div>
				<Button
					className="text-uppercase"
					variant="primary"
					onClick={addUser}
					size="sm"
					style={buttonStyle}
					disabled={disabled}
				>
					Add New
				</Button>
				<Button
					className="text-uppercase mx-2"
					variant="outline-info"
					onClick={deleteAllUsers}
					size="sm"
					style={{ width: 120, letterSpacing: 1 }}
					disabled={disabled}
				>
					Delete All
				</Button>
				<Button
					className="text-uppercase"
					variant="link"
					onClick={resetUsers}
					size="sm"
					style={buttonStyle}
					disabled={disabled}
				>
					reset
				</Button>
			</div>
			<ButtonGroup>
				<Button
					variant={
						selectedStatuses?.length === 0 ||
						selectedStatuses?.includes(StatusEnum.PAID)
							? "success"
							: "outline-secondary"
					}
					className="text-uppercase"
					onClick={() => onSelectedStatusChanged(StatusEnum.PAID)}
					size="sm"
					style={buttonStyle}
					disabled={disabled}
				>
					Paid
				</Button>
				<Button
					variant={
						selectedStatuses?.length === 0 ||
						selectedStatuses?.includes(StatusEnum.PENDING)
							? "warning"
							: "outline-secondary"
					}
					className="text-uppercase"
					size="sm"
					onClick={() => onSelectedStatusChanged(StatusEnum.PENDING)}
					style={buttonStyle}
					disabled={disabled}
				>
					Pending
				</Button>
				<Button
					variant={
						selectedStatuses?.length === 0 ||
						selectedStatuses?.includes(StatusEnum.UNPAID)
							? "danger"
							: "outline-secondary"
					}
					className="text-uppercase"
					size="sm"
					onClick={() => onSelectedStatusChanged(StatusEnum.UNPAID)}
					style={buttonStyle}
					disabled={disabled}
				>
					Unpaid
				</Button>
			</ButtonGroup>
			<Form>
				<Form.Control
					type="text"
					placeholder="Search.."
					onChange={() => alert("not implemented yet")}
					style={{ width: 200 }}
					disabled={disabled}
				/>
			</Form>
		</Stack>
	);
};

export default GridControls;
