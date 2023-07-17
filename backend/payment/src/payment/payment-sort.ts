const avisSort: any[] = [
    {
        $lookup: {from: 'factures', localField: 'factureId', foreignField: '_id', as: 'facture'}
    },
    {
        $addFields: {
            _id: {$toString: '$_id'},
            expertId: {$toString: '$expertId'}
        }
    },
]

export default avisSort