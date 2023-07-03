import { async } from 'app/store/utils'

export const constants = {
  GET_MODELS: async('GET_MODELS'),
}

export const getModels = () => ({
  type: constants.GET_MODELS.request,
})
