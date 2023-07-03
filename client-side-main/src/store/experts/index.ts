import * as _actions from './experts.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface ExpertsState {
  top: {
    data: Expert | null
    loading: boolean
    errors: string[]
  }
  expert: {
    data: Expert | null
    loading: boolean
    errors: string[]
  }
  searchExperts: {
    data: Expert[] | null
    loading: boolean
    errors: string[]
    total: number
  }
  reviews: {
    still: boolean
    limit: number
    total: number
    avg: string
    data: null | Review[]
    loading: boolean
  }
  reservation: {
    loading: boolean
    errors: string[]
  }
}

type Expert = any
type Review = any
