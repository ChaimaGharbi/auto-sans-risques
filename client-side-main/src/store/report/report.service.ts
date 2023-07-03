import { getClient } from 'app/store/api'

export const getQuestions = () =>
  getClient()
    .get(`/rapport/questionCtg`)
    .then(({ data }) => data)

export const createAnswer = (
  rapportId,
  category_name,
  categoryId,
  questionId,
  reponse,
  comment
) => {
  return getClient()
    .post(`/rapport/reponse`, {
      rapportId,
      category_name,
      categoryId,
      questionId,
      reponse,
      comment,
    })
    .then(({ data }) => data)
}
export const getResponses = rapportId => {
  return getClient()
    .get(`/rapport/reponse/rapport/${rapportId}`)
    .then(({ data }) => data)
}

export const submitReport = rapportId => {
  return getClient()
    .post(`/rapport/reponses/${rapportId}/true`, {
      reponses: [],
    })
    .then(({ data }) => data)
}

export const uploadImagesToReport = (rapportId, files) => {
  return getClient()
    .post(`/rapport/upload/${rapportId}`, files)
    .then(({ data }) => data)
}

export const getReport = rapportId => {
  return getClient()
    .get(`/rapport/rapport/${rapportId}`)
    .then(({ data }) => data)
}
