import { async } from 'app/store/utils'

export const constants = {
  TOP_EXPERTS: async('TOP_EXPERTS'),
  GET_EXPERT: async('GET_EXPERT'),
  GET_REVIEWS: async('GET_REVIEWS'),
  CREATE_RESERVATION: async('CREATE_RESERVATION'),
  SEARCH_EXPERTS: async('SEARCH_EXPERTS'),
  FETCH_MORE_REVIEWS: 'FETCH_MORE_REVIEWS',
  ADD_REVIEW: async('ADD_REVIEW'),
}

export const addReview = review => ({
  type: constants.ADD_REVIEW.success,
  payload: review,
})

export const getMoreReviews = () => ({
  type: constants.FETCH_MORE_REVIEWS,
})

export const topExperts = () => ({
  type: constants.TOP_EXPERTS.request,
})

export const getExpert = id => ({
  type: constants.GET_EXPERT.request,
  payload: id,
})

export const getReviews = (id, limit) => ({
  type: constants.GET_REVIEWS.request,
  payload: {
    id,
    limit,
  },
})

export const createReservation = reservation => ({
  type: constants.CREATE_RESERVATION.request,
  payload: reservation,
})

export const searchExperts = queryParams => ({
  type: constants.SEARCH_EXPERTS.request,
  payload: queryParams,
})
