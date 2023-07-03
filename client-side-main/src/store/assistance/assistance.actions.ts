import { async } from 'app/store/utils'
import { Body } from '.'
export const constants = {
  ASK_FOR_ASSISTANCE: async('ASK_FOR_ASSISTANCE'),
}

export const askForAssistance = (body: Body) => ({
  type: constants.ASK_FOR_ASSISTANCE.request,
  payload: body,
})
