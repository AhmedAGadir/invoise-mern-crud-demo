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
	currency: string;
	status: Status;
};

export type IFormSubmitHandler = (data: User) => void;
