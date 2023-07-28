const sort: any[] = [
    {$lookup: {from: 'articlecategories', localField: 'categoryId', foreignField: '_id', as: 'category'}},
    {
        $addFields: {
            _id: {$toString: '$_id'},
            categoryId: {$toString: '$categoryId'}
        }
    },
    {$project: {salt: 0, password: 0}}
]

export default sort;