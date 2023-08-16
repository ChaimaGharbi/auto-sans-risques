import { async } from 'app/store/utils'

export const constants = {
  GET_RECENT_NOTIFICATIONS: async('GET_RECENT_NOTIFICATIONS'),
  GET_ALL_NOTIFICATIONS: async('GET_ALL_NOTIFICATIONS'),
  RECEIVE_NOTIFICATION: 'RECEIVE_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
  UPDATE_NOTIFICATIONS_BY_IDS: async('UPDATE_NOTIFICATIONS_BY_IDS'),
  UPDATE_NOTIFICATION_BY_ID: async('UPDATE_NOTIFICATION_BY_ID'),
}

export const getRecentNotifications = id => {
  return {
    type: constants.GET_RECENT_NOTIFICATIONS.request,
    payload: id,
  }
}

export const getAllNotifications = id => {
  return {
    type: constants.GET_ALL_NOTIFICATIONS.request,
    payload: id,
  }
}

export const receiveNotification = notification => {
  return {
    type: constants.RECEIVE_NOTIFICATION,
    payload: notification,
  }
}

export const clearNotification = () => {
  return {
    type: constants.CLEAR_NOTIFICATION,
  }
}

export const updateNotificationsByIds = ids => {console.log(ids);
return {
  type: constants.UPDATE_NOTIFICATIONS_BY_IDS.request,
  payload: ids,
}}

export const updateNotificationById = id => {
  console.log(id);
  
  return {
    type: constants.UPDATE_NOTIFICATION_BY_ID.request,
    payload: id,
  }
}
