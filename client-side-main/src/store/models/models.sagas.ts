import { Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './models.service'

export const getModelsSaga = new Saga(constants.GET_MODELS.request)
  .do(() => [api.getModels])
  .then(response => {
    return {
      type: constants.GET_MODELS.success,
      payload: response,
    }
  })
  .catch(constants.GET_MODELS.failure)
  .get()
