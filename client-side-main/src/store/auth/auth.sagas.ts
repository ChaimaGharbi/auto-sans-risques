import { redirect, Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './auth.service'

export const getMeSaga = new Saga(constants.GET_ME.request)
  .do(() => [api.getMe])
  .then(response => {
    return {
      type: constants.GET_ME.success,
      payload: response,
    }
  })
  .catch(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('cm9sZQ==')

    return {
      type: constants.GET_ME.failure,
    }
  })
  .get()

export const logoutSaga = new Saga(constants.LOGOUT)
  .then(redirect('/home'))
  .get()

export const updateExpertsData = new Saga(constants.UPDATE_EXPERTS_DATA.request)
  .do(action => [api.updateExpertsData, action.payload])
  .then(constants.UPDATE_EXPERTS_DATA.success)
  .catch(constants.UPDATE_EXPERTS_DATA.failure)
  .get()

export const updateClientsData = new Saga(constants.UPDATE_CLIENTS_DATA.request)
  .do(action => [api.updateClientsData, action.payload])
  .then(constants.UPDATE_CLIENTS_DATA.success)
  .catch(constants.UPDATE_CLIENTS_DATA.failure)
  .get()

export const updateByUpload = new Saga(constants.UPDATE_BY_UPLOAD.request)
  .do(action => [api.upload, action.role, action.payload])
  .then(constants.UPDATE_BY_UPLOAD.success)
  .then(constants.GET_ME.request)
  .catch(constants.UPDATE_BY_UPLOAD.failure)
  .get()

export const updatePassword = new Saga(constants.UPDATE_PASSWORD.request)
  .do(action => [
    api.updatePassword,
    action.payload.role,
    action.payload.old,
    action.payload.new,
  ])
  .then(constants.UPDATE_PASSWORD.success)
  .catch(e => {
    return {
      type: constants.UPDATE_PASSWORD.failure,
      payload: e.response.data.message,
    }
  })
  .get()

export const loginSaga = new Saga(constants.LOGIN.request)
  .do(action => [api.login, action.payload.email, action.payload.password])
  .then(response => {
    const role = btoa(response.role)
    localStorage.setItem(btoa('role'), role)
    return {
      type: constants.LOGIN.success,
      payload: response.accessToken,
    }
  })
  .then({
    type: constants.GET_ME.request,
  })
  .then(redirect(''))
  .catch(e => {
    return {
      type: constants.LOGIN.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()

export const signupSaga = new Saga(constants.SIGNUP.request)
  .do(action => [api.signup, action.payload])
  .then(response => {
    return {
      type: constants.SIGNUP.success,
      payload: `Votre compte a été créé. Veuillez vérifier votre e-mail pour vérifier votre compte.`,
    }
  })
  .catch(e => {
    return {
      type: constants.SIGNUP.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()

export const forgotPassword = new Saga(constants.FORGOT_PASSWORD.request)
  .do(action => [api.forgotPassword, action.payload])
  .then(response => ({
    type: constants.FORGOT_PASSWORD.success,
    payload: response.message,
  }))
  .catch(e => {
    return {
      type: constants.FORGOT_PASSWORD.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()

export const resetPassword = new Saga(constants.RESET_PASSWORD.request)
  .do(action => [
    api.resetPassword,
    action.payload.token,
    action.payload.password,
  ])
  .then(constants.RESET_PASSWORD.success)
  .catch(e => {
    return {
      type: constants.RESET_PASSWORD.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()

export const getAvailability = new Saga(constants.GET_AVAILABILITY.request)
  .do(() => [api.getAvailability])
  .then(response => {
    return {
      type: constants.GET_AVAILABILITY.success,
      payload: {
        data: response.dispos,
        repos: response.repos,
        recurrent: response.recurrent,
      },
    }
  })
  .catch(() => {
    return {
      type: constants.GET_AVAILABILITY.failure,
    }
  })
  .get()

export const setRepos = new Saga(constants.SET_REPOS.request)
  .do(action => [api.setRepos, action.payload])
  .then(response => {
    return {
      type: constants.SET_REPOS.success,
      payload: response,
    }
  })
  .catch(e => {
    return {
      type: constants.SET_REPOS.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()

export const setRecurrent = new Saga(constants.SET_RECURRENT.request)
  .do(action => [api.setRecurrent, action.payload])
  .then(response => {
    return {
      type: constants.SET_RECURRENT.success,
      payload: response,
    }
  })
  .catch(e => {
    return {
      type: constants.SET_RECURRENT.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()

export const resetAvailability = new Saga(constants.RESET_AVAILABILITY.request)
  .do(() => [api.resetAvailability])
  .then(constants.RESET_AVAILABILITY.success)
  .catch(e => {
    return {
      type: constants.RESET_AVAILABILITY.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()

export const createAvailability = new Saga(
  constants.CREATE_AVAILABILITY.request
)
  .do(action => [api.createAvailability, action.payload])
  .then(response => {
    return {
      type: constants.CREATE_AVAILABILITY.success,
      payload: response,
    }
  })
  .catch(e => {
    return {
      type: constants.CREATE_AVAILABILITY.failure,
      payload: [e.response.data.response.message],
    }
  })
  .get()
