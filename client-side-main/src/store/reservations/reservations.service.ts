import axios, { getClient } from 'app/store/api'

export const getMissionsRequests = id =>
  getClient()
    .post(`/reservation/paginate?group=false`, {
      sortOrder: 'desc',
      sortField: 'priority',
      pageNumber: 1,
      pageSize: 20,
      filter: {
        clientId: '',
        expertId: id,
        status: 'EN_ATTENTE',
      },
    })
    .then(({ data }) => data)

export const getOngoingMissions = id =>
  getClient()
    .post(`/reservation/paginate?group=false`, {
      sortOrder: 'desc',
      sortField: 'priority',
      pageNumber: 1,
      pageSize: 20,
      filter: {
        clientId: '',
        expertId: id,
        status: 'ACCEPTEE',
      },
    })
    .then(({ data }) => data)

export const getCompletedMissions = id =>
  getClient()
    .post(`/reservation/paginate?group=false`, {
      sortOrder: 'desc',
      sortField: 'priority',
      pageNumber: 1,
      pageSize: 20,
      filter: {
        clientId: '',
        expertId: id,
        status: 'COMPLETEE',
      },
    })
    .then(({ data }) => data)

export const updateReservation = (id, etat) =>
  getClient()
    .put(`/reservation/updateStatus/${id}/${etat}`)
    .then(({ data }) => data)

export const getMyReservations = id =>
  getClient()
    .post(`/reservation/paginate?group=false`, {
      sortOrder: 'desc',
      sortField: 'priority',
      pageNumber: 1,
      pageSize: 20,
      filter: {
        clientId: id,
        expertId: '',
        status: '',
      },
    })
    .then(({ data }) => data)

export const getMyReclamations = id =>
  getClient()
    .post(`/reclamation/paginate`, {
      pageNumber: 1,
      pageSize: 20,
      sortField: 'priority',
      sortOrder: 'desc',
      filter: {
        clientId: id,
      },
    })
    .then(({ data }) => data)

export const getReportsClient = id =>
  getClient()
    .post(`/reservation/paginate?group=false`, {
      sortOrder: 'desc',
      sortField: 'priority',
      pageNumber: 1,
      pageSize: 20,
      filter: {
        clientId: id,
        expertId: '',
      },
    })
    .then(({ data }) => data)

export const createReclamation = data =>
  getClient()
    .post('/reclamation', data)
    .then(({ data }) => data)

export const createRapport = data =>
  getClient()
    .post('/rapport', data)
    .then(({ data }) => data)

export const getMission = id =>
  getClient()
    .get(`/reservation/${id}`)
    .then(({ data }) => data)
