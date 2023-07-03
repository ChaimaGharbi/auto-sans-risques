import { Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './global.service'

export const getAllPacks = new Saga(constants.GET_ALL_PACKS.request)
  .do(() => [api.getAllPacks])
  .then(response => {
    return {
      type: constants.GET_ALL_PACKS.success,
      payload: {
        data: response,
      },
    }
  })
  .catch(constants.GET_ALL_PACKS.failure)
  .get()
