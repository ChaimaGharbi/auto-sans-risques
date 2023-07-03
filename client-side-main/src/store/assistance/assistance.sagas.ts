import { Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './assistance.service'

export const askForAssistanceSaga = new Saga(
  constants.ASK_FOR_ASSISTANCE.request
)
  .do(action => [api.askForAssistance, action.payload])
  .then(constants.ASK_FOR_ASSISTANCE.success)
  .catch(constants.ASK_FOR_ASSISTANCE.failure)
  .get()
