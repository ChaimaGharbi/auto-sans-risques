export const pagination = (pipelines,options)=>{
  const limit = options.limit ? options.limit : 10
  const page = options.page ? options.page : 1
    pipelines.push({ 
      $facet: {
        metadata: [
          {
              $count: 'totalCount'
          }
        ], 
        entities: [
          {
            $skip: (page - 1 ) * limit //(selectedPage - 1 ) * pageSize
          }, {
            $limit: limit
          }
        ]
      } 
    });
    pipelines.push({ 
      $project: {
        entities: 1, 
        totalCount: {
            $arrayElemAt: [
                '$metadata.totalCount', 0
            ]
        }, 
      }
    });
    pipelines.push({
      $addFields: {
        totalPages: { $ceil:{$divide: [ "$totalCount", limit ] }},
        limit:limit,
        page:page
      }
    })
    return pipelines;
}