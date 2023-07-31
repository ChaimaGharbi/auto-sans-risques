import * as _actions from './notifications.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface NotificationsState {
  recent: {
    data: Notification[] | null
    loading: boolean
    errors: string[]
  }
  all: {
    data: Notification[] | null
    loading: boolean
    errors: string[]
  }
  newOnes: {
    data: Notification[] | null
    loading: boolean
    errors: string[]
  }
}

interface Reservation {
  status: string
}

interface Notification {
  _id: string
  is_read: boolean
  message: string
  createdAt: string
  reservationId: string
  senderId: string
  reservation: Reservation[]
}
