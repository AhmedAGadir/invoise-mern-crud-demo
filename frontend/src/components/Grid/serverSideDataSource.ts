import {
	IServerSideDatasource,
	IServerSideGetRowsParams,
} from "ag-grid-community";
import { User } from "../../types";
import { UserService } from "../../services/userService";

export type ServerSideDataSource = IServerSideDatasource & {
	getFilterValues: (field: string) => Promise<string[]>;
};

const createServerSideDataSource: (
	userService: UserService,
	dataFetched: () => void
) => ServerSideDataSource = (userService, dataFetched) => ({
	getRows: async (params: IServerSideGetRowsParams<User>) => {
		console.log(`[getRows] ${JSON.stringify(params.request, null, 1)}`);

		try {
			const { startRow, endRow, filterModel, sortModel } = params.request;

			const { rowData } = await userService.getUsers({
				startRow,
				endRow,
				filterModel,
				sortModel,
			});

			params.success({
				rowData,
			});
		} catch (error) {
			console.error(error);

			params.fail();
		}
		// used to remove placeholder grid and show real grid
		dataFetched();
	},
	getFilterValues: async (field: string) => {
		console.log(`[getFilterValues] ${field}`);
		try {
			const response = await userService.getFilterValues(field);
			return response;
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});

export default createServerSideDataSource;
