const avisSort: any[] = [
    {
        $addFields: {
            _id: {$toString: '$_id'},
            expertId: {$toString: '$expertId'},
            clientId: {$toString: '$clientId'}
        }
    },
    {
        $lookup: {from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert'}
    },
    {
        $lookup: {from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client'}
    },
    {$project: {salt: 0, password: 0}}
]

export default avisSort