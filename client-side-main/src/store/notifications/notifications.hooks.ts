import { useSelector, useDispatch } from 'react-redux'
import { actions, NotificationsState } from '.'
import { useEffect } from 'react'
import { useGetUser } from '../hooks'

export const useRecentNotifications = () => {
  const dp = useDispatch()
  const state = useSelector(
    (state: { notifications: NotificationsState }) => state.notifications.recent
  )

  const { me } = useGetUser()

  useEffect(() => {
    const id = me.data?._id

    if (id) {
      dp(actions.getRecentNotifications(id))
    }
  }, [me.data?._id])

  return state
}

export const useAllNotifications = () => {
  const dp = useDispatch()
  const state = useSelector(
    (state: { notifications: NotificationsState }) => state.notifications.all
  )

  const { me } = useGetUser()

  useEffect(() => {
    const id = me.data?._id

    if (id) {
      dp(actions.getAllNotifications(id))
    }
  }, [me.data?._id])

  return state
}

export const useNewNotifications = () => {
  const state = useSelector(
    (state: { notifications: NotificationsState }) =>
      state.notifications.newOnes
  )

  return state
}

export const useReceiveNotification = () => {
  const dp = useDispatch()
  return (notification: any) => {
    dp(actions.receiveNotification(notification))
  }
}

export const useClearNotification = () => {
  const dp = useDispatch()
  return () => {
    dp(actions.clearNotification())
  }
}
