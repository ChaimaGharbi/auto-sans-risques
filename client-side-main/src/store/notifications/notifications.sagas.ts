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

export const updateNotificationsByIds = new Saga(
  constants.UPDATE_NOTIFICATIONS_BY_IDS.request
)
  .do(action => [api.updateNotificationsByIds, action.payload])
  .then(response => {
    return {
      type: constants.UPDATE_NOTIFICATIONS_BY_IDS.success,
      payload: response.entities,
    }
  })
  .catch(constants.UPDATE_NOTIFICATIONS_BY_IDS.failure)
  .get()


export const updateNotificationById = new Saga(
  constants.UPDATE_NOTIFICATION_BY_ID.request
)
  .do(action => [api.updateNotificationById, action.payload])
  .then(response => {
    return {
      type: constants.UPDATE_NOTIFICATION_BY_ID.success,
      payload: response,
    }
  })
  .catch(constants.UPDATE_NOTIFICATION_BY_ID.failure)
  .get()
