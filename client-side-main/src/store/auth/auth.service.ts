import { getClient } from 'app/store/api'

export const login = (email, password) => {
  return getClient()
    .post(`/auth/signin`, {
      email,
      password,
    })
    .then(({ data }) => data)
}

export const upload = (role, body) => {
  return getClient()
    .put(`/${role}/upload/metadata`, body)
    .then(({ data }) => data)
}

export const signup = data => {
  return getClient()
    .post(`/auth/signup`, data)
    .then(({ data }) => data)
}

export const getMe = () => {
  return getClient()
    .get(`/auth/me`)
    .then(({ data }) => data)
}

export const updatePassword = (
  role: string,
  oldPassword: string,
  newPassword: string
) => {
  return getClient()
    .put(`/auth/update-password/${role}`, {
      old: oldPassword,
      new: newPassword,
    })
    .then(({ data }) => data)
}

export const forgotPassword = email => {
  return getClient()
    .get(`/auth/recover/${email}`)
    .then(({ data }) => data)
}

export const resetPassword = (token, password) => {
  return getClient()
    .post(`/auth/reset/${token}`, { password })
    .then(({ data }) => data)
}

export const updateExpertsData = data => {
  return getClient()
    .put(`/expert`, data)
    .then(({ data }) => data)
}

export const updateClientsData = data => {
  return getClient()
    .put(`/client`, data)
    .then(({ data }) => data)
}

export const getAvailability = () => {
  return getClient()
    .get(`/disponibilite`)
    .then(({ data }) => data)
}

export const setRepos = repos => {
  return getClient()
    .put(`/disponibilite/metadata`, {
      repos,
    })
    .then(({ data }) => data)
}

export const setRecurrent = recurrent => {
  return getClient()
    .put(`/disponibilite/metadata`, {
      recurrent,
    })
    .then(({ data }) => data)
}

export const resetAvailability = () => {
  return getClient()
    .delete(`/disponibilite/reset`)
    .then(({ data }) => data)
}

export const createAvailability = payload => {
  return getClient()
    .post(`/disponibilite`, payload)
    .then(({ data }) => data)
}

export const removeAvailability = (id) => {
  return getClient()
  .delete(`/disponibilite/remove/${id}`)
  .then(({ data }) => data)
}
