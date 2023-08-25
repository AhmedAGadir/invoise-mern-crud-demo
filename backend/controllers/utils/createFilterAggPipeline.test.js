const createFilterAggPipeline = require("./createFilterAggPipeline");

describe("createFilterAggPipeline", () => {
	it("should return empty array if filterModel is empty", () => {
		const filterModel = {};
		const result = createFilterAggPipeline(filterModel);
		expect(result).toEqual([]);
	});
	it("should filter text contains", () => {
		const filterModel = {
			name: {
				filterType: "text",
				type: "contains",
				filter: "a",
			},
		};
		const result = createFilterAggPipeline(filterModel);
		expect(result).toEqual([
			{
				$match: {
					name: new RegExp("a", "i"),
				},
			},
		]);
	});
	it("should filter number equals", () => {
		const filterModel = {
			age: {
				filterType: "number",
				type: "equals",
				filter: "30",
			},
		};
		const result = createFilterAggPipeline(filterModel);
		expect(result).toEqual([
			{
				$match: {
					age: 30,
				},
			},
		]);
	});
	it("should filter number lessThan", () => {
		const filterModel = {
			age: {
				filterType: "number",
				type: "lessThan",
				filter: "30",
			},
		};
		const result = createFilterAggPipeline(filterModel);
		expect(result).toEqual([
			{
				$match: {
					age: { $lt: 30 },
				},
			},
		]);
	});
	it("should filter number greaterThan", () => {
		const filterModel = {
			age: {
				filterType: "number",
				type: "greaterThan",
				filter: "30",
			},
		};
		const result = createFilterAggPipeline(filterModel);
		expect(result).toEqual([
			{
				$match: {
					age: { $gt: 30 },
				},
			},
		]);
	});
	it("should filter set", () => {
		const filterModel = {
			age: {
				filterType: "set",
				values: ["30", "40"],
			},
		};
		const result = createFilterAggPipeline(filterModel);
		expect(result).toEqual([
			{
				$match: {
					age: { $in: ["30", "40"] },
				},
			},
		]);
	});
});
