const expertSort: any[] = [
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
    },
    {
        $project: {
            fullName: 1,
            ville: 1,
            img: 1,
            roles: {$arrayElemAt: ['$roles', 0]},
            adresse: {$concat: ['$adresse', ' ', '$ville']},
            note: 1,
            lat: 1,
            lng: 1,
            specialitiesModels: 1,
            specialitiesMarks: 1,
            email: 1,
            tel: 1,
            specialite: 1,
            credit: 1,
            nb_missions: 1,
            status: 1,
            carteFiscale: 1,
            cin: 1,
            diplome: 1,
            signature: 1,
            repos: 1,
            photoAtelier: 1
        }
    }
]

export default expertSort