import axios from 'app/store/api'

export const addReview = review =>
  axios.post(`/avis`, review).then(({ data }) => {data})

export const getTopExperts = () =>
  axios.get(`/expert/stats/top10`).then(({ data }) => data)

export const getExpert = id =>
  axios.get(`/expert/${id}`).then(({ data }) => data)

export const getReviews = (id, limit: string) =>
  axios.get(`/avis/expert/${id}/${limit}`).then(({ data }) => data)

export const createReservation = reservation =>
  axios.post(`/reservation`, reservation).then(({ data }) => data)

export const searchExperts = filter =>
  axios.post(`/expert/paginate?group=false`, filter).then(({ data }) => data)
