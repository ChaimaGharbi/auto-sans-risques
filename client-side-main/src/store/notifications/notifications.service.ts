import axios from 'app/store/api'

export const getRecentNotifications = (id, pageSize = 5) =>
  axios
    .post(`/notification/paginate`, {
      pageNumber: 1,
      pageSize,
      role: 'EXPERT',
      sortOrder: 'desc',
      filter: {
        receiverId: id,
      },
    })
    .then(({ data }) => data)
