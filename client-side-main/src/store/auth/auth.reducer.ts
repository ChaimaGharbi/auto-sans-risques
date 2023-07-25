import { Reducer } from 'app/store/utils'
import toast from 'react-hot-toast'
import { constants, AuthenticationState } from '.'

const initialState: AuthenticationState = {
  extra: {
    dropDown: false,
    modal: false,
  },
  isAuthenticated: null,
  me: {
    data: null,
    loading: false,
    errors: [],
  },
  login: {
    loading: false,
    errors: [],
  },
  signup: {
    loading: false,
    error: [],
    done: false,
    data: null,
  },
  forgotPassword: {
    loading: false,
    errors: [],
    data: null,
  },
  resetPassword: {
    loading: false,
    errors: [],
    done: false,
  },
  updateExpertsData: {
    errors: [],
    loading: false,
  },
  updatePassword: {
    errors: [],
    loading: false,
    done: false,
  },
  availability: {
    loading: false,
    errors: [],
    data: null,
    repos: null,
    recurrent: null,
  },
  setRepo: {
    loading: false,
    errors: [],
  },
  setRecurrent: {
    loading: false,
    errors: [],
  },
  resetAvailability: {
    loading: false,
    errors: [],
  },
  createAvailability: {
    loading: false,
    errors: [],
  },
  updateByUpload: {
    loading: false,
    errors: [],
  },
  removeAvailability: {
    loading: false,
    errors: [],
    done: false,
  },
}

export const authenticationReducer = new Reducer(initialState)
  .on(constants.RESET_PASSWORD.request, state => {
    state.resetPassword.loading = true
    state.resetPassword.errors = []
    state.resetPassword.done = false
  })
  .on(constants.RESET_PASSWORD.success, state => {
    state.resetPassword.loading = false
    state.resetPassword.done = true
    state.resetPassword.errors = null
  })
  .on(constants.RESET_PASSWORD.failure, (state, action) => {
    state.resetPassword.loading = false
    state.resetPassword.done = false
    state.resetPassword.errors = action.payload
  })
  .on(constants.UPDATE_BY_UPLOAD.request, state => {
    state.updateByUpload.loading = true
    state.updateByUpload.errors = []
  })
  .on(constants.UPDATE_BY_UPLOAD.success, state => {
    state.updateByUpload.loading = false
    state.updateByUpload.errors = []
    toast.success('Image etait bien uploadé')
  })
  .on(constants.UPDATE_BY_UPLOAD.failure, state => {
    state.updateByUpload.loading = false
  })
  .on(constants.SIGNUP.request, state => {
    state.signup.loading = true
    state.signup.error = []
    state.signup.done = false
    state.signup.data = null
  })
  .on(constants.SIGNUP.success, (state, action) => {
    state.signup.loading = false
    state.signup.error = []
    state.signup.done = true
    state.signup.data = action.payload
  })
  .on(constants.SIGNUP.failure, (state, action) => {
    state.signup.loading = false
    state.signup.error = action.payload
    state.signup.done = false
    state.signup.data = null
  })
  .on(constants.GET_ME.request, state => {
    state.me.loading = true
    state.me.errors = []
    state.isAuthenticated = null
  })
  .on(constants.GET_ME.success, (state, action) => {
    state.me.loading = false
    state.me.data = action.payload
    state.me.errors = []
    state.isAuthenticated = true
  })
  .on(constants.GET_ME.failure, state => {
    state.me.loading = false
    state.me.errors = []
    state.isAuthenticated = false
  })
  .on(constants.LOGIN.request, state => {
    state.login.loading = true
    state.login.errors = []
  })
  .on(constants.LOGIN.success, (state, action) => {
    state.login.loading = false
    console.log(action.payload)

    localStorage.setItem('token', action.payload)

    state.login.errors = []
    state.isAuthenticated = true
    state.extra.modal = false
  })
  .on(constants.LOGIN.failure, (state, action) => {
    state.login.loading = false
    state.login.errors = action.payload
    state.isAuthenticated = false
    state.me.data = null
  })
  .on(constants.LOGOUT, state => {
    state.isAuthenticated = false
    state.extra.dropDown = false
    state.me.data = null
    localStorage.removeItem('token')
    localStorage.removeItem('cm9sZQ==')
  })
  .on(constants.TOGGLE_DROP_DOWN, state => {
    state.extra.dropDown = !state.extra.dropDown
  })
  .on(constants.CLOSE_DROP_DOWN, state => {
    state.extra.dropDown = false
  })
  .on(constants.TOGGLE_MODAL, state => {
    state.extra.modal = !state.extra.modal
  })
  .on(constants.CLOSE_MODAL, state => {
    state.extra.modal = false
  })
  .on(constants.OPEN_MODAL, state => {
    state.extra.modal = true
  })
  .on(constants.FORGOT_PASSWORD.request, state => {
    state.forgotPassword.loading = true
    state.forgotPassword.errors = []
    state.forgotPassword.data = null
  })
  .on(constants.FORGOT_PASSWORD.reset, state => {
    state.forgotPassword.loading = false
    state.forgotPassword.errors = []
    state.forgotPassword.data = null
  })
  .on(constants.FORGOT_PASSWORD.success, (state, action) => {
    state.forgotPassword.loading = false
    state.forgotPassword.errors = []
    state.forgotPassword.data = action.payload
  })
  .on(constants.FORGOT_PASSWORD.failure, (state, action) => {
    state.forgotPassword.loading = false
    state.forgotPassword.errors = action.payload
    state.forgotPassword.data = action.payload
  })
  .on(
    [
      constants.UPDATE_EXPERTS_DATA.request,
      constants.UPDATE_CLIENTS_DATA.request,
    ],
    state => {
      state.updateExpertsData.loading = false
      state.updateExpertsData.errors = []
    }
  )
  .on(
    [
      constants.UPDATE_EXPERTS_DATA.success,
      constants.UPDATE_CLIENTS_DATA.success,
    ],
    state => {
      state.updateExpertsData.loading = false
      state.updateExpertsData.errors = []
      toast.success('Votre profil a été mis à jour avec succès')
    }
  )
  .on(
    [
      constants.UPDATE_EXPERTS_DATA.failure,
      constants.UPDATE_CLIENTS_DATA.failure,
    ],
    (state, action) => {
      state.forgotPassword.loading = false
      state.forgotPassword.errors = action.payload
      toast.error('Une erreur est survenue')
    }
  )
  .on(constants.GET_AVAILABILITY.reset, state => {
    state.availability.loading = false
    state.availability.errors = []
  })
  .on(constants.GET_AVAILABILITY.success, (state, action) => {
    state.availability.loading = false
    state.availability.errors = []
    state.availability.data = action.payload.data
    state.availability.repos = action.payload.repos
    state.availability.recurrent = action.payload.recurrent
  })
  .on(constants.GET_AVAILABILITY.failure, (state, action) => {
    state.availability.loading = false
    state.availability.errors = action.payload
    toast.error('Une erreur est survenue')
  })
  .on(constants.SET_REPOS.request, state => {
    state.setRepo.loading = true
    state.setRepo.errors = []
  })
  .on(constants.SET_REPOS.success, (state, action) => {
    state.setRepo.loading = false
    state.setRepo.errors = []
    state.availability.repos = action.payload.repos
    toast.success('Votre disponibilité a été mise à jour avec succès')
  })
  .on(constants.SET_REPOS.failure, (state, action) => {
    state.setRepo.loading = false
    state.setRepo.errors = action.payload
    toast.error('Une erreur est survenue')
  })
  .on(constants.SET_RECURRENT.request, state => {
    state.setRecurrent.loading = true
    state.setRecurrent.errors = []
  })
  .on(constants.SET_RECURRENT.success, (state, action) => {
    state.setRecurrent.loading = false
    state.setRecurrent.errors = []
    state.availability.recurrent = action.payload.recurrent

    if (state.me.data) {
      state.me.data.recurrentAvailability = action.payload.recurrent
    }
    toast.success('Votre disponibilité a été mise à jour avec succès')
  })
  .on(constants.SET_RECURRENT.failure, (state, action) => {
    state.setRecurrent.loading = false
    state.setRecurrent.errors = action.payload
    toast.error('Une erreur est survenue')
  })
  .on(constants.RESET_AVAILABILITY.request, state => {
    state.resetAvailability.loading = true
    state.resetAvailability.errors = []
  })
  .on(constants.RESET_AVAILABILITY.success, state => {
    state.resetAvailability.loading = false
    state.resetAvailability.errors = []
    state.availability.data = []
    toast.success('Votre disponibilité a été mise à jour avec succès')
  })
  .on(constants.RESET_AVAILABILITY.failure, (state, action) => {
    state.resetAvailability.loading = false
    state.resetAvailability.errors = action.payload
    toast.error('Une erreur est survenue')
  })
  .on(constants.CREATE_AVAILABILITY.request, state => {
    state.createAvailability.loading = true
    state.createAvailability.errors = []
  })
  .on(constants.CREATE_AVAILABILITY.success, (state, action) => {
    state.createAvailability.loading = false
    state.createAvailability.errors = []
    if (!state.availability.data) state.availability.data = []
    state.availability.data.push(action.payload)
    toast.success('Votre disponibilité a été mise à jour avec succès')
  })
  .on(constants.CREATE_AVAILABILITY.failure, (state, action) => {
    state.createAvailability.loading = false
    state.createAvailability.errors = action.payload
    toast.error('Une erreur est survenue')
  })
  .on(constants.UPDATE_PASSWORD.request, state => {
    state.updatePassword.loading = true
    state.updatePassword.errors = []
    state.updatePassword.done = false
  })
  .on(constants.UPDATE_PASSWORD.success, state => {
    state.updatePassword.loading = false
    state.updatePassword.errors = []
    state.updatePassword.done = true
    toast.success('Votre mot de passe a été mis à jour avec succès')
  })
  .on(constants.UPDATE_PASSWORD.failure, (state, action) => {
    state.updatePassword.loading = false
    state.updatePassword.errors = action.payload
  })
  .on(constants.REMOVE_AVAILABILITY.request, state => {
    state.removeAvailability.loading = true
    state.removeAvailability.errors = []
    state.removeAvailability.done = false
  })
  .on(constants.REMOVE_AVAILABILITY.success, (state, action) => {
    state.removeAvailability.loading = false
    state.removeAvailability.errors = []
    state.removeAvailability.done = true
    const eventId = action.payload;    
    state.availability.data = state.availability.data.filter(event => event._id !== eventId);
    toast.success('Votre disponibilité a été mise à jour avec succès')
  })
  .on(constants.REMOVE_AVAILABILITY.failure, (state,action) => {
    state.removeAvailability.loading = false
    state.removeAvailability.errors = action.payload
    toast.error('Une erreur est survenue')
  })
  .get()
