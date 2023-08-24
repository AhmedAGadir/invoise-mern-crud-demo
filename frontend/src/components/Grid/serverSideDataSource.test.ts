import { IServerSideGetRowsParams } from "ag-grid-community";
import { UserService } from "../../services/userService";
import createServerSideDataSource from "./serverSideDataSource";
import { User } from "../../types";

describe("serverSideDataSource", () => {
	const mockUsers = [
		{
			_id: "1",
			firstName: "John",
			lastName: "Smith",
			email: "john.smith@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=1",
			invoiceNumber: "INV-0001",
			issueDate: "2020-01-01",
			dueDate: "2020-01-31",
			amount: 1000,
			currency: "USD",
			status: "unpaid",
		},
		{
			_id: "2",
			firstName: "Jane",
			lastName: "Doe",
			email: "jane.doe@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=2",
			invoiceNumber: "INV-0002",
			issueDate: "2020-02-01",
			dueDate: "2020-02-29",
			amount: 2000,
			currency: "USD",
			status: "paid",
		},
	];

	const mockResponse = {
		rowData: mockUsers,
	};

	beforeEach(() => {
		// clear mocks
		jest.clearAllMocks();
	});

	it("should return a list of users", async () => {
		const mockGetUsers = jest.fn().mockResolvedValue(mockResponse);
		const mockGetFilterValues = jest.fn().mockResolvedValue(["John", "Jane"]);
		const mockUserService: UserService = {
			getUsers: mockGetUsers,
			getFilterValues: mockGetFilterValues,
			addUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
			deleteAllUsers: jest.fn(),
			resetUsers: jest.fn(),
		};
		const mockDataFetched = jest.fn();
		const mockSuccess = jest.fn();
		const serverSideDataSource = createServerSideDataSource(
			mockUserService,
			mockDataFetched
		);
		const mockGetRowsParams = {
			request: {
				startRow: 0,
				endRow: 2,
				filterModel: {},
				sortModel: [],
			},
			success: mockSuccess,
			fail: jest.fn(),
		} as unknown as IServerSideGetRowsParams<User>;

		await serverSideDataSource.getRows(mockGetRowsParams);
		expect(mockGetUsers).toHaveBeenCalledWith(mockGetRowsParams.request);
		expect(mockSuccess).toHaveBeenCalledWith(mockResponse);
	});

	it("should call params.fail when getUsers throws an error", async () => {
		const mockGetUsers = jest.fn().mockRejectedValue(new Error("error"));
		const mockGetFilterValues = jest.fn().mockResolvedValue(["John", "Jane"]);
		const mockUserService: UserService = {
			getUsers: mockGetUsers,
			getFilterValues: mockGetFilterValues,
			addUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
			deleteAllUsers: jest.fn(),
			resetUsers: jest.fn(),
		};
		const mockDataFetched = jest.fn();
		const mockFail = jest.fn();
		const serverSideDataSource = createServerSideDataSource(
			mockUserService,
			mockDataFetched
		);
		const mockGetRowsParams = {
			request: {
				startRow: 0,
				endRow: 2,
				filterModel: {},
				sortModel: [],
			},
			success: jest.fn(),
			fail: mockFail,
		} as unknown as IServerSideGetRowsParams<User>;

		await serverSideDataSource.getRows(mockGetRowsParams);
		expect(mockGetUsers).toHaveBeenCalledWith(mockGetRowsParams.request);
		expect(mockFail).toHaveBeenCalled();
	});

	it("should return a list of filter values", async () => {
		const mockGetUsers = jest.fn().mockResolvedValue(mockResponse);
		const mockGetFilterValues = jest.fn().mockResolvedValue(["John", "Jane"]);
		const mockUserService: UserService = {
			getUsers: mockGetUsers,
			getFilterValues: mockGetFilterValues,
			addUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
			deleteAllUsers: jest.fn(),
			resetUsers: jest.fn(),
		};
		const mockDataFetched = jest.fn();
		const serverSideDataSource = createServerSideDataSource(
			mockUserService,
			mockDataFetched
		);
		const mockField = "firstName";

		const filterValues = await serverSideDataSource.getFilterValues(mockField);
		expect(mockGetFilterValues).toHaveBeenCalledWith(mockField);
		expect(filterValues).toEqual(["John", "Jane"]);
	});

	it('should call "dataFetched" callback', async () => {
		const mockGetUsers = jest.fn().mockResolvedValue(mockResponse);
		const mockGetFilterValues = jest.fn().mockResolvedValue(["John", "Jane"]);
		const mockUserService: UserService = {
			getUsers: mockGetUsers,
			getFilterValues: mockGetFilterValues,
			addUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
			deleteAllUsers: jest.fn(),
			resetUsers: jest.fn(),
		};
		const mockDataFetched = jest.fn();
		const mockSuccess = jest.fn();
		const serverSideDataSource = createServerSideDataSource(
			mockUserService,
			mockDataFetched
		);
		const mockGetRowsParams = {
			request: {
				startRow: 0,
				endRow: 2,
				filterModel: {},
				sortModel: [],
			},
			success: mockSuccess,
			fail: jest.fn(),
		} as unknown as IServerSideGetRowsParams<User>;

		await serverSideDataSource.getRows(mockGetRowsParams);
		expect(mockDataFetched).toHaveBeenCalled();
	});

	it("should return an empty list of filter values when getFilterValues throws an error", async () => {
		const mockGetUsers = jest.fn().mockResolvedValue(mockResponse);
		const mockGetFilterValues = jest.fn().mockRejectedValue(new Error("error"));
		const mockUserService: UserService = {
			getUsers: mockGetUsers,
			getFilterValues: mockGetFilterValues,
			addUser: jest.fn(),
			updateUser: jest.fn(),
			deleteUser: jest.fn(),
			deleteAllUsers: jest.fn(),
			resetUsers: jest.fn(),
		};
		const mockDataFetched = jest.fn();
		const serverSideDataSource = createServerSideDataSource(
			mockUserService,
			mockDataFetched
		);
		const mockField = "email";

		const filterValues = await serverSideDataSource.getFilterValues(mockField);
		expect(mockGetFilterValues).toHaveBeenCalledWith(mockField);
		expect(filterValues).toEqual([]);
	});
});
