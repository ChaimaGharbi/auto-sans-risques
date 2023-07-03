import { Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './notifications.service'

export const getRecentNotifications = new Saga(
  constants.GET_RECENT_NOTIFICATIONS.request
)
  .do(action => [api.getRecentNotifications, action.payload])
  .then(response => {
    return {
      type: constants.GET_RECENT_NOTIFICATIONS.success,
      payload: response.entities,
    }
  })
  .catch(constants.GET_RECENT_NOTIFICATIONS.failure)
  .get()

export const getAllNotifications = new Saga(
  constants.GET_ALL_NOTIFICATIONS.request
)
  .do(action => [api.getRecentNotifications, action.payload, 100])
  .then(response => {
    return {
      type: constants.GET_ALL_NOTIFICATIONS.success,
      payload: response.entities,
    }
  })
  .catch(constants.GET_ALL_NOTIFICATIONS.failure)
  .get()
