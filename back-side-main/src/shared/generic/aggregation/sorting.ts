export const sorting = (pipelines, options) => {
    const sortField = options.sortField ?? "createdAt"; // The field to sort with
    const sortOrderU = options.sortOrder === 'desc' ? -1 : 1; // The sort order

    pipelines.push({$sort: {[sortField]: sortOrderU}});
}