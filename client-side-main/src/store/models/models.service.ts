import axios from 'app/store/api'

export const getModels = () =>
  axios
    .post(`/models/paginate`, {
      pageNumber: 1,
      pageSize: 100,
      sortField: 'name',
      sortOrder: 'asc',
      withChoose: true,
    })
    .then(({ data }) => data)
