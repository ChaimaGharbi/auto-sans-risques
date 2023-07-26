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

export const updateNotificationsByIds = ids =>
  axios.post('/notification/updates', { ids }).then(({ data }) => data)

export const updateNotificationById = id => 
    axios.put(`/notification/updates/${id}`).then(({data}) => data)
