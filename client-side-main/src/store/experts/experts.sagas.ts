import { Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './experts.service'

export const addReviewSaga = new Saga(constants.ADD_REVIEW.request)
  .do(action => [api.addReview, action.payload])
  .then(response => {
    return {
      type: constants.ADD_REVIEW.success,
      payload: response,
    }
  })
  .catch(constants.ADD_REVIEW.failure)
  .get()
  

export const getTopExpertsSaga = new Saga(constants.TOP_EXPERTS.request)
  .do(() => [api.getTopExperts])
  .then(response => {
    return {
      type: constants.TOP_EXPERTS.success,
      payload: response,
    }
  })
  .catch(constants.TOP_EXPERTS.failure)
  .get()

export const getExpertSaga = new Saga(constants.GET_EXPERT.request)
  .do(action => [api.getExpert, action.payload])
  .then(response => {
    return {
      type: constants.GET_EXPERT.success,
      payload: response,
    }
  })
  .catch(constants.GET_EXPERT.failure)
  .get()

export const getReviewsSaga = new Saga(constants.GET_REVIEWS.request)
  .do(action => [api.getReviews, action.payload.id, action.payload.limit])
  .then(response => {
    return {
      type: constants.GET_REVIEWS.success,
      payload: response,
    }
  })
  .catch(constants.GET_REVIEWS.failure)
  .get()

export const searchExpertsSaga = new Saga(constants.SEARCH_EXPERTS.request)
  .do(action => [api.searchExperts, action.payload])
  .then(response => {
    return {
      type: constants.SEARCH_EXPERTS.success,
      payload: response,
    }
  })
  .catch(constants.SEARCH_EXPERTS.failure)
  .get()

export const createReservationSaga = new Saga(
  constants.CREATE_RESERVATION.request
)
  .do(action => [api.createReservation, action.payload])
  .then(response => {
    return {
      type: constants.CREATE_RESERVATION.success,
      payload: response,
    }
  })
  .catch(constants.CREATE_RESERVATION.failure)
  .get()
