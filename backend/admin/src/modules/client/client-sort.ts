const clientSort: any[] = [
    {
        $project: {
            salt: 0,
            password: 0,
            roles: 0,
            carteFiscale: 0,
            cin: 0,
            diplome: 0,
            signature: 0,
            photoAtelier: 0
        }
    },
    {
        $addFields: {
            _id: {$toString: '$_id'},
            adresse: {$concat: ['$adresse', ' ', '$ville']},
            specialite: {
                $reduce: {
                    input: '$specialite',
                    initialValue: '',
                    in: {
                        $concat: [
                            '$$value',
                            {
                                $cond: {
                                    if: {
                                        $eq: ['$$value', '']
                                    },
                                    then: '',
                                    else: ', '
                                }
                            },
                            '$$this'
                        ]
                    }
                }
            }
        }
    }
]

export default clientSort