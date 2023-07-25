import { async } from 'app/store/utils'

export const constants = {
  GET_ME: async('GET_ME'),
  LOGOUT: 'LOGOUT',
  TOGGLE_DROP_DOWN: 'TOGGLE_DROP_DOWN',
  CLOSE_DROP_DOWN: 'CLOSE_DROP_DOWN',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  LOGIN: async('LOGIN'),

  SIGNUP: async('SIGNUP'),

  FORGOT_PASSWORD: async('FORGOT_PASSWORD'),

  RESET_PASSWORD: async('RESET_PASSWORD'),

  UPDATE_EXPERTS_DATA: async('UPDATE_EXPERTS_DATA'),
  UPDATE_CLIENTS_DATA: async('UPDATE_CLIENTS_DATA'),

  GET_AVAILABILITY: async('GET_AVAILABILITY'),

  SET_REPOS: async('SET_REPOS'),

  SET_RECURRENT: async('SET_RECURRENT'),

  RESET_AVAILABILITY: async('RESET_AVAILABILITY'),

  CREATE_AVAILABILITY: async('CREATE_AVAILABILITY'),

  UPDATE_BY_UPLOAD: async('UPDATE_BY_UPLOAD'),

  UPDATE_PASSWORD: async('UPDATE_PASSWORD'),

  REMOVE_AVAILABILITY: async('REMOVE_AVAILABILITY'),
}

export const updatePassword = data => ({
  type: constants.UPDATE_PASSWORD.request,
  payload: data,
})

export const updateExpertsData = data => ({
  type: constants.UPDATE_EXPERTS_DATA.request,
  payload: data,
})

export const updateByUpload = (role, data) => ({
  type: constants.UPDATE_BY_UPLOAD.request,
  payload: data,
  role,
})

export const updateClientsData = data => ({
  type: constants.UPDATE_CLIENTS_DATA.request,
  payload: data,
})

export const resetPassword = (token, password) => ({
  type: constants.RESET_PASSWORD.request,
  payload: { token, password },
})

export const forgotPassword = email => ({
  type: constants.FORGOT_PASSWORD.request,
  payload: email,
})

export const forgotPasswordReset = () => ({
  type: constants.FORGOT_PASSWORD.reset,
})

export const getMe = () => {
  return { type: constants.GET_ME.request }
}

export const logout = () => {
  return { type: constants.LOGOUT }
}

export const toggleDropDown = () => {
  return { type: constants.TOGGLE_DROP_DOWN }
}

export const closeDropDown = () => {
  return { type: constants.CLOSE_DROP_DOWN }
}

export const toggleModal = () => {
  return { type: constants.TOGGLE_MODAL }
}

export const openModal = () => {
  return { type: constants.OPEN_MODAL }
}

export const closeModal = () => {
  return { type: constants.CLOSE_MODAL }
}

export const login = (email, password) => {
  return { type: constants.LOGIN.request, payload: { email, password } }
}

export const signup = payload => {
  return { type: constants.SIGNUP.request, payload }
}

export const getAvailability = () => {
  return { type: constants.GET_AVAILABILITY.request }
}

export const setRepos = repos => {
  return { type: constants.SET_REPOS.request, payload: repos }
}

export const setRecurrent = recurrent => {
  return { type: constants.SET_RECURRENT.request, payload: recurrent }
}

export const resetAvailability = () => {
  return { type: constants.RESET_AVAILABILITY.request }
}

export const createAvailability = payload => {
  return { type: constants.CREATE_AVAILABILITY.request, payload }
}

export const removeAvailability = (id) => {
  return { type: constants.REMOVE_AVAILABILITY.request, payload: id }
}