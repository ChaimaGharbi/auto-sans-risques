import { async } from 'app/store/utils'

export const constants = {
  GET_QUESTIONS: async('GET_QUESTIONS'),
  CREATE_RESPONSE: async('CREATE_RESPONSE'),
  GET_RESPONSES: async('GET_RESPONSES'),
  SUBMIT_REPORT: async('SUBMIT_REPORT'),
  UPLOAD_IMAGES: async('UPLOAD_IMAGES'),
  GET_REPORT: async('GET_REPORT'),
}

export const getReport = (rapportId: string) => ({
  type: constants.GET_REPORT.request,
  payload: rapportId,
})

export const uploadImages = (rapportId: string, images: any) => ({
  type: constants.UPLOAD_IMAGES.request,
  payload: { rapportId, images },
})

export const submitReport = id => {
  return {
    type: constants.SUBMIT_REPORT.request,
    payload: id,
  }
}

export const getResponses = id => {
  return {
    type: constants.GET_RESPONSES.request,
    payload: id,
  }
}

export const getQuestions = () => ({
  type: constants.GET_QUESTIONS.request,
})

export const createResponse = (
  rapportId,
  categoryName,
  categoryId,
  questionId,
  reponse,
  comment
) => ({
  type: constants.CREATE_RESPONSE.request,
  payload: {
    rapportId,
    categoryName,
    categoryId,
    questionId,
    reponse,
    comment,
  },
})
