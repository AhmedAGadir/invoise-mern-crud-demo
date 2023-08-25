import { Currency } from "./currencies";

export enum StatusEnum {
	UNPAID = "unpaid",
	PAID = "paid",
	PENDING = "pending",
}

export type Status = "paid" | "pending" | "unpaid";

export type User = {
	_id: string;
	name: string;
	email: string;
	avatarUrl: string;
	invoiceNumber: string;
	issueDate: string;
	dueDate: string;
	amount: number;
	currency: Currency;
	status: Status;
};
