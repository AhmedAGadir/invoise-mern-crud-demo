import React, { useMemo, useCallback } from "react";
import { Stack, Button, ButtonGroup, Form } from "react-bootstrap";
import { Status, StatusEnum } from "../../types";
import {
	BsCurrencyDollar,
	BsCurrencyEuro,
	BsCurrencyPound,
	BsCurrencyYen,
} from "react-icons/bs";
import { Currency } from "../../currencies";

type GridControlProps = {
	addUser: () => void;
	deleteAllUsers: () => void;
	resetUsers: () => void;
	selectedStatuses: Status[] | undefined;
	onStatusFilterChange: (status: Status[]) => void;
	selectedCurrency: Currency | undefined;
	onCurrencyChange: (currency: Currency | undefined) => void;
	disabled: boolean;
};

const GridControls = ({
	addUser,
	deleteAllUsers,
	resetUsers,
	selectedStatuses,
	onStatusFilterChange,
	selectedCurrency,
	onCurrencyChange,
	disabled,
}: GridControlProps) => {
	const buttonStyle = useMemo(
		() => ({ width: 100, letterSpacing: 1, fontSize: 13 }),
		[]
	);
	const currencyButtonStyle = useMemo(
		() => ({ width: 70, letterSpacing: 1, fontSize: 13 }),
		[]
	);

	const onStatusChanged = useCallback(
		(status: Status) => {
			let updatedStatuses;
			if (selectedStatuses === undefined) {
				// if nothing is selected, initialise to status
				updatedStatuses = [status];
			} else if (selectedStatuses.length === 1) {
				// if only one is selected, toggle it
				updatedStatuses = selectedStatuses.includes(status) ? [] : [status];
			} else {
				// if more than one is selected, select only the clicked one
				updatedStatuses = [status];
			}

			onStatusFilterChange(updatedStatuses);
		},
		[onStatusFilterChange, selectedStatuses]
	);

	return (
		<Stack
			direction="horizontal"
			className="mb-3 d-flex align-items-end justify-content-between"
		>
			{/* CRUD BUTTONS START */}
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
			{/* CRUD BUTTONS END */}
			{/* STATUS FILTER BTN GROUP START */}
			<ButtonGroup>
				<Button
					variant={
						selectedStatuses?.length === 0 ||
						selectedStatuses?.includes(StatusEnum.PAID)
							? "success"
							: "outline-secondary"
					}
					className="text-uppercase"
					onClick={() => onStatusChanged(StatusEnum.PAID)}
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
					onClick={() => onStatusChanged(StatusEnum.PENDING)}
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
					onClick={() => onStatusChanged(StatusEnum.UNPAID)}
					style={buttonStyle}
					disabled={disabled}
				>
					Unpaid
				</Button>
			</ButtonGroup>
			{/* STATUS FILTER BTN GROUP END */}
			{/* CURRENCY CONTEXT BTN GROUP START */}
			<ButtonGroup>
				<Button
					variant={selectedCurrency === "GBP" ? "primary" : "outline-secondary"}
					className="text-uppercase"
					onClick={() =>
						onCurrencyChange(selectedCurrency === "GBP" ? undefined : "GBP")
					}
					size="sm"
					style={currencyButtonStyle}
					disabled={disabled}
				>
					<BsCurrencyPound size={16} />
				</Button>
				<Button
					variant={selectedCurrency === "USD" ? "primary" : "outline-secondary"}
					className="text-uppercase"
					onClick={() =>
						onCurrencyChange(selectedCurrency === "USD" ? undefined : "USD")
					}
					size="sm"
					style={currencyButtonStyle}
					disabled={disabled}
				>
					<BsCurrencyDollar size={16} />
				</Button>
				<Button
					variant={selectedCurrency === "EUR" ? "primary" : "outline-secondary"}
					className="text-uppercase"
					onClick={() =>
						onCurrencyChange(selectedCurrency === "EUR" ? undefined : "EUR")
					}
					size="sm"
					style={currencyButtonStyle}
					disabled={disabled}
				>
					<BsCurrencyEuro size={16} />
				</Button>
				<Button
					variant={selectedCurrency === "JPY" ? "primary" : "outline-secondary"}
					className="text-uppercase"
					onClick={() =>
						onCurrencyChange(selectedCurrency === "JPY" ? undefined : "JPY")
					}
					size="sm"
					style={currencyButtonStyle}
					disabled={disabled}
				>
					<BsCurrencyYen size={16} />
				</Button>
			</ButtonGroup>
			{/* CURRENCY CONTEXT BTN GROUP END */}
		</Stack>
	);
};

export default GridControls;
