function createFilterAggregationPipeline(filterModel) {
	let aggregationPipeline = [];

	const filterKeys = Object.keys(filterModel);
	filterKeys.forEach((key) => {
		const filter = filterModel[key];
		if (filter.filterType === "text") {
			if (filter.type === "contains") {
				aggregationPipeline.push({
					$match: {
						[key]: new RegExp(filter.filter, "i"),
					},
				});
			}
		} else if (filter.filterType === "number") {
			if (filter.type === "equals") {
				aggregationPipeline.push({
					$match: {
						[key]: Number(filter.filter),
					},
				});
			} else if (filter.type === "lessThan") {
				aggregationPipeline.push({
					$match: {
						[key]: { $lt: Number(filter.filter) },
					},
				});
			} else if (filter.type === "greaterThan") {
				aggregationPipeline.push({
					$match: {
						[key]: { $gt: Number(filter.filter) },
					},
				});
			}
		} else if (filter.filterType === "set") {
			// if no values are selected, return no rows
			aggregationPipeline.push({
				$match: {
					[key]: { $in: filter.values || [""] },
				},
			});
		}
	});

	return aggregationPipeline;
}

module.exports = createFilterAggregationPipeline;
