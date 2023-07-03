import * as _actions from './report.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface ReportsState {
  rapport: {
    data: any | null
    loading: boolean
    errors: string[]
  }
  questions: {
    data: any[] | null
    loading: boolean
    errors: string[]
  }
  createResponse: {
    questionId: string | null
    loading: boolean | null
    errors: string[]
  }
  responses: {
    data: any[] | null
    loading: boolean
    errors: string[]
  }
  submitReport: {
    loading: boolean
    errors: string[]
  }

  uploadImages: {
    loading: boolean
    errors: string[]
  }
}
