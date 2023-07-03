import { Reducer } from 'app/store/utils'
import toast from 'react-hot-toast'
import { constants, ReportsState } from '.'

const initialState: ReportsState = {
  rapport: {
    data: null,
    loading: false,
    errors: [],
  },
  questions: {
    data: [],
    loading: false,
    errors: [],
  },
  createResponse: {
    questionId: null,
    loading: null,
    errors: [],
  },
  responses: {
    data: [],
    loading: false,
    errors: [],
  },
  submitReport: {
    loading: false,
    errors: [],
  },
  uploadImages: {
    loading: false,
    errors: [],
  },
}

export const reportsReducer = new Reducer(initialState)
  .on(constants.GET_QUESTIONS.request, state => {
    state.questions.loading = true
    state.questions.errors = []
  })
  .on(constants.GET_QUESTIONS.success, (state, action) => {
    state.questions.loading = false
    state.questions.data = action.payload.data
    state.questions.data?.sort((a, b) => a.priority - b.priority)
    state.questions.errors = []
  })
  .on(constants.GET_QUESTIONS.failure, state => {
    state.questions.loading = false
    state.questions.errors = []
  })
  .on(constants.GET_RESPONSES.request, state => {
    state.responses.loading = true
    state.responses.errors = []
  })
  .on(constants.GET_RESPONSES.success, (state, action) => {
    state.responses.loading = false
    state.responses.data = action.payload.data
    state.responses.errors = []
  })
  .on(constants.GET_RESPONSES.failure, state => {
    state.responses.loading = false
    state.responses.errors = []
  })
  .on(constants.CREATE_RESPONSE.request, (state, action) => {
    state.createResponse.loading = true
    state.createResponse.errors = []
    state.createResponse.questionId = action.payload.questionId
  })
  .on(constants.CREATE_RESPONSE.success, state => {
    state.createResponse.loading = false
    state.createResponse.errors = []
    state.createResponse.questionId = null
  })
  .on(constants.CREATE_RESPONSE.failure, state => {
    state.createResponse.loading = false
    state.createResponse.errors = []
    state.createResponse.questionId = null
  })
  .on(constants.SUBMIT_REPORT.request, state => {
    state.submitReport.loading = true
    state.submitReport.errors = []
  })
  .on(constants.SUBMIT_REPORT.success, state => {
    state.submitReport.loading = false
    state.submitReport.errors = []
  })
  .on(constants.SUBMIT_REPORT.failure, state => {
    state.submitReport.loading = false
    state.submitReport.errors = []
  })

  .on(constants.UPLOAD_IMAGES.request, state => {
    state.uploadImages.loading = true
    state.uploadImages.errors = []
  })
  .on(constants.UPLOAD_IMAGES.success, state => {
    state.uploadImages.loading = false
    state.uploadImages.errors = []
  })
  .on(constants.UPLOAD_IMAGES.failure, state => {
    state.uploadImages.loading = false
    state.uploadImages.errors = []
  })

  .on(constants.GET_REPORT.request, state => {
    state.uploadImages.loading = true
    state.uploadImages.errors = []
  })
  .on(constants.GET_REPORT.success, (state, action) => {
    state.uploadImages.loading = false
    state.uploadImages.errors = []
    state.rapport.data = action.payload.data
  })
  .on(constants.GET_REPORT.failure, state => {
    state.uploadImages.loading = false
    state.uploadImages.errors = []
    state.rapport.data = null
  })

  .get()
