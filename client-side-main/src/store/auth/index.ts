import * as _actions from './auth.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface AuthenticationState {
  signup: {
    loading: boolean
    error: string[]
    done: boolean
    data: any
  }
  extra: {
    dropDown: boolean
    modal: boolean
  }
  isAuthenticated: null | boolean
  updateExpertsData: {
    errors: string[]
    loading: boolean
  }
  me: {
    data: User | null
    loading: boolean
    errors: string[]
  }
  login: {
    loading: boolean
    errors: string[]
  }
  forgotPassword: {
    loading: boolean
    errors: string[]
    data: any
  }
  resetPassword: {
    loading: boolean
    errors: any
    done: boolean
  }
  availability: {
    loading: boolean
    errors: string[]
    data: any
    repos: null | boolean
    recurrent: null | boolean
  }
  setRepo: {
    loading: boolean
    errors: string[]
  }
  setRecurrent: {
    loading: boolean
    errors: string[]
  }
  resetAvailability: {
    loading: boolean
    errors: string[]
  }
  createAvailability: {
    loading: boolean
    errors: string[]
  }
  updateByUpload: {
    loading: boolean
    errors: string[]
  }
  updatePassword: {
    loading: boolean
    errors: string[]
    done: boolean
  }
  removeAvailability: {
    loading: boolean
    errors: string[]
    done: boolean
  }
}

interface User {
  address: string
  email: string
  fullName: string
  gouv: string
  isVerified: boolean
  lat: number
  lng: number
  img: string
  ville: string
  role: 'CLIENT' | 'EXPERT'
  status: number
  tel: string
  _id: string
  propos?: string
  certif?: string[]

  carteFiscale?: string
  cin?: string
  diplome?: string
  signature?: string
  photoAtelier?: string

  nb_missions?: number
  credit?: number

  specialitiesModels?: any[]
  specialitiesMarks?: any[]
  recurrentAvailability?: boolean
}
