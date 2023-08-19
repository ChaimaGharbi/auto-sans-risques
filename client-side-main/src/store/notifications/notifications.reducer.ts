import { Reducer } from 'app/store/utils'
import { constants, NotificationsState } from '.'

const initialState: NotificationsState = {
  recent: {
    data: [],
    loading: false,
    errors: [],
  },
  all: {
    data: [],
    loading: false,
    errors: [],
  },
  newOnes: {
    data: [],
    loading: false,
    errors: [],
  },
}

export const notificationsReducer = new Reducer(initialState)
  .on(constants.GET_RECENT_NOTIFICATIONS.request, state => {
    state.recent.loading = true
    state.recent.errors = []
  })
  .on(constants.GET_RECENT_NOTIFICATIONS.success, (state, action) => {
    state.recent.loading = false
    state.recent.data = action.payload
    state.recent.errors = []
  })
  .on(constants.GET_RECENT_NOTIFICATIONS.failure, state => {
    state.recent.loading = false
    state.recent.errors = []
  })
  .on(constants.GET_ALL_NOTIFICATIONS.request, state => {
    state.all.loading = true
    state.all.errors = []
  })
  .on(constants.GET_ALL_NOTIFICATIONS.success, (state, action) => {
    state.all.loading = false
    state.all.data = action.payload
    state.all.errors = []
  })
  .on(constants.GET_ALL_NOTIFICATIONS.failure, state => {
    state.all.loading = false
    state.all.errors = []
  })
  .on(constants.RECEIVE_NOTIFICATION, (state, action) => {
    if (state.recent.data) state.recent.data.unshift(action.payload)
    if (state.newOnes.data) state.newOnes.data.unshift(action.payload)
  })
  .on(constants.CLEAR_NOTIFICATION, state => {
    if (state.newOnes.data) state.newOnes.data = []
  })
  .on(constants.UPDATE_NOTIFICATIONS_BY_IDS.request, state => {
    state.all.loading = true
    state.all.errors = []
  })
  .on(constants.UPDATE_NOTIFICATIONS_BY_IDS.success, (state, action) => {
    const updatedIds = action.payload
    console.log('act', action.payload)

    state.all.loading = false
    state.all.data?.map(notification => {
      if (updatedIds.includes(notification._id)) {
        notification.is_read = true
      }
    })
    state.recent.data?.map(notification => {
      if (updatedIds.includes(notification._id)) {
        notification.is_read = true
      }
    })
    state.newOnes.data?.map(notification => {
      if (updatedIds.includes(notification._id)) {
        notification.is_read = true
      }
    })
  })
  .on(constants.UPDATE_NOTIFICATIONS_BY_IDS.failure, state => {
    state.all.loading = false
    state.all.errors = []
  })
  .on(constants.UPDATE_NOTIFICATION_BY_ID.request, state => {
    ;(state.all.loading = true), (state.all.errors = [])
  })
  .on(constants.UPDATE_NOTIFICATION_BY_ID.success, (state, action) => {
    ;(state.all.loading = false),
      state.all.data?.map(notification => {
        if (notification._id == action.payload._id) notification.is_read = true
      })
      state.recent.data?.map(notification => {
        if (notification._id == action.payload._id) notification.is_read = true
      })
      state.newOnes.data?.map(notification => {
        if (notification._id == action.payload._id) notification.is_read = true
      })
  })
  .on(constants.UPDATE_NOTIFICATION_BY_ID.failure, state => {
    state.all.loading = false
    state.all.errors = []
  })
  .get()
