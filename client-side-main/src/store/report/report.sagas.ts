import { redirect, Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './report.service'

export const submitReport = new Saga(constants.SUBMIT_REPORT.request)
  .do(action => [api.submitReport, action.payload])
  .then(response => {
    return {
      type: constants.SUBMIT_REPORT.success,
      payload: {
        data: response,
      },
    }
  })
  .then(redirect('/reports'))
  .catch(constants.SUBMIT_REPORT.failure)
  .get()

export const getQuestions = new Saga(constants.GET_QUESTIONS.request)
  .do(() => [api.getQuestions])
  .then(response => {
    return {
      type: constants.GET_QUESTIONS.success,
      payload: {
        data: response,
      },
    }
  })
  .catch(constants.GET_QUESTIONS.failure)
  .get()

export const getResponses = new Saga(constants.GET_RESPONSES.request)
  .do(action => [api.getResponses, action.payload])
  .then(response => {
    return {
      type: constants.GET_RESPONSES.success,
      payload: {
        data: response.status === 404 ? [] : response,
      },
    }
  })
  .catch({
    type: constants.GET_RESPONSES.success,
    payload: {
      data: [],
    },
  })
  .get()

export const createAnswer = new Saga(constants.CREATE_RESPONSE.request)
  .do(action => [
    api.createAnswer,
    action.payload.rapportId,
    action.payload.categoryName,
    action.payload.categoryId,
    action.payload.questionId,
    action.payload.reponse,
    action.payload.comment,
  ])
  .then(response => {
    return {
      type: constants.CREATE_RESPONSE.success,
      payload: {
        data: response,
      },
    }
  })
  .catch(constants.CREATE_RESPONSE.failure)
  .get()

export const uploadImagesToReport = new Saga(constants.UPLOAD_IMAGES.request)
  .do(action => [
    api.uploadImagesToReport,
    action.payload.rapportId,
    action.payload.images,
  ])
  .then(constants.UPLOAD_IMAGES.success)
  .catch(constants.UPLOAD_IMAGES.failure)
  .get()

export const getReport = new Saga(constants.GET_REPORT.request)
  .do(action => [api.getReport, action.payload])
  .then(response => {
    return {
      type: constants.GET_REPORT.success,
      payload: {
        data: response,
      },
    }
  })
  .catch(constants.GET_REPORT.failure)
  .get()
