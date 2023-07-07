const sort: any[] = [
    {$addFields: {_id: {$toString: '$_id'}}},
    {$project: {salt: 0, password: 0}}
]

export default sort;