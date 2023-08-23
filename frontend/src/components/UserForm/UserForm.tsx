import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IFormSubmitHandler, Status, User } from "../../types";
import { currencies } from "../../currencies";
import { v4 as uuid } from "uuid";

enum StatusEnum {
	unpaid = "unpaid",
	paid = "paid",
	pending = "pending",
}

interface UserFormProps {
	data: User | null;
	submit: IFormSubmitHandler | null;
	hide: () => void;
}

const UserForm = (props: UserFormProps) => {
	const [show, setShow] = useState(true);

	const handleClose = () => {
		setShow(false);
		props.hide();
	};

	let id: string;
	let name: string;
	let email: string;
	let avatarUrl: string;
	let invoiceNumber: string;
	let issueDate: string;
	let dueDate: string;
	let amount: number;
	let currency: string;
	let status: Status;

	if (props.data) {
		({
			_id: id,
			name,
			email,
			avatarUrl,
			invoiceNumber,
			issueDate,
			dueDate,
			amount,
			currency,
			status,
		} = props.data);
	} else {
		id = uuid();
		name = "John Doe";
		email = "john.doe@gmail.com";
		avatarUrl =
			"https://images.pexels.com/photos/3344325/pexels-photo-3344325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
		invoiceNumber = `INV-${id.slice(0, 3).toUpperCase()}`;
		// todays date
		issueDate = new Date().toLocaleDateString("en-GB");
		// one month from today
		dueDate = new Date(
			new Date().setMonth(new Date().getMonth() + 1)
		).toLocaleDateString("en-GB");
		amount = 100;
		currency = "GBP";
		status = "unpaid";
	}

	const [idForm, setIdForm] = useState<string>(id);
	const [nameForm, setNameForm] = useState<string>(name);
	const [emailForm, setEmailForm] = useState<string>(email);
	const [avatarUrlForm, setAvatarUrlForm] = useState<string>(avatarUrl);
	const [invoiceNumberForm, setInvoiceNumberForm] =
		useState<string>(invoiceNumber);
	const [issueDateForm, setIssueDateForm] = useState<string>(issueDate);
	const [dueDateForm, setDueDateForm] = useState<string>(dueDate);
	const [amountForm, setAmountForm] = useState<number>(amount);
	const [currencyForm, setCurrencyForm] = useState<string>(currency);
	const [statusForm, setStatusForm] = useState<Status>(status);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data: User = {
			_id: idForm,
			name: nameForm,
			email: emailForm,
			avatarUrl: avatarUrlForm,
			invoiceNumber: invoiceNumberForm,
			issueDate: issueDateForm,
			dueDate: dueDateForm,
			amount: amountForm,
			currency: currencyForm,
			status: statusForm,
		};
		props.submit?.(data);
		handleClose();
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Invoice #{invoiceNumberForm}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Name
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="text"
									placeholder="Enter name..."
									required
									value={nameForm}
									onChange={(e) => setNameForm(e.target.value)}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Email
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="email"
									placeholder="Enter email..."
									required
									value={emailForm}
									onChange={(e) => setEmailForm(e.target.value)}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Avatar URL
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="text"
									placeholder="Enter Avatar URL..."
									required
									value={avatarUrlForm}
									onChange={(e) => setAvatarUrlForm(e.target.value)}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Issue Date
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="text"
									placeholder="Enter issue date..."
									required
									value={issueDateForm}
									onChange={(e) => setIssueDateForm(e.target.value)}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Due Date
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="text"
									placeholder="Enter due date..."
									required
									value={dueDateForm}
									onChange={(e) => setDueDateForm(e.target.value)}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Amount
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="number"
									placeholder="Enter Amount..."
									required
									value={amountForm}
									onChange={(e) => setAmountForm(parseInt(e.target.value))}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Currency
							</Form.Label>
							<Col sm="9">
								<Form.Select
									required
									value={currencyForm}
									onChange={(e) => setCurrencyForm(e.target.value)}
								>
									{currencies.map((currency) => (
										<option value={currency} key={currency}>
											{currency}
										</option>
									))}
								</Form.Select>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-2">
							<Form.Label column sm="3">
								Status
							</Form.Label>
							<Col sm="9">
								<Form.Select
									required
									value={statusForm}
									onChange={(e) => setStatusForm(e.target.value as Status)}
								>
									<option value={StatusEnum.unpaid}>Unpaid</option>
									<option value={StatusEnum.pending}>Pending</option>
									<option value={StatusEnum.paid}>Paid</option>
								</Form.Select>
							</Col>
						</Form.Group>

						<div className="d-flex justify-content-end">
							<Button
								className="d-block mt-3"
								variant={props.data === null ? "success" : "primary"}
								type="submit"
							>
								{props.data === null ? "Create" : "Save Changes"}
							</Button>
						</div>
					</Form>
				</Modal.Body>
				{/* <Modal.Footer> */}

				{/* </Modal.Footer> */}
			</Modal>
		</>
	);
};

export default UserForm;
