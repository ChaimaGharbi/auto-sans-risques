import { useSelector, useDispatch } from 'react-redux'
import { actions, ReservationsState } from '.'
import { useContext, useEffect } from 'react'
import { useGetUser } from '../hooks'
import { useParams } from 'react-router-dom'
import { SocketContext } from 'app/socket'

export const useGetMyReclamations = () => {
  const { role, me } = useGetUser()

  const dp = useDispatch()
  useEffect(() => {
    if (me.data?._id && role === 'CLIENT') {
      dp(actions.getMyReclamations(me.data?._id))
    }
  }, [me.data, role, dp])

  const state = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.reclamations
  )

  return {
    ...state,
  }
}

export const useGetMyReservations = () => {
  const { role, me } = useGetUser()

  const dp = useDispatch()
  useEffect(() => {
    if (me.data?._id && role === 'CLIENT') {
      dp(actions.getMyReservations(me.data?._id))
    }
  }, [me.data, role, dp])

  const state = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.myReservations
  )

  return {
    ...state,
  }
}

export const useGetMissionsRequests = () => {
  const { role, me } = useGetUser()

  const dp = useDispatch()
  useEffect(() => {
    if (me.data?._id && role === 'EXPERT') {
      dp(actions.getMissionsRequests(me.data?._id))
    }
  }, [me.data, role, dp])

  const state = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.missionsRequests
  )

  return {
    ...state,
  }
}

export const useGetOngoingMissions = () => {
  const { role, me } = useGetUser()

  const dp = useDispatch()
  useEffect(() => {
    if (me.data?._id && role === 'EXPERT') {
      dp(actions.getOngoingMissions(me.data?._id))
    }
  }, [me.data, role, dp])

  const state = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.ongoingMissions
  )

  return {
    ...state,
  }
}

export const useGetMission = () => {
  const state = useSelector(
    (state: { reservations: ReservationsState }) => state.reservations.mission
  )
  const { id } = useParams()
  const dp = useDispatch()
  useEffect(() => {
    dp(actions.getMission(id))
  }, [dp])

  return {
    ...state,
  }
}

export const useCreateReclamation = () => {
  const dp = useDispatch()

  const state = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.createReclamation
  )

  return {
    ...state,
    createReclamation: (data: any) => {
      dp(actions.createReclamation(data))
    },
    openModal: () => {
      dp(actions.openCreateReclamation())
    },
    closeModal: () => {
      dp(actions.closeCreateReclamation())
    },
  }
}

export const useGetReportsForClient = () => {
  const { role, me } = useGetUser()

  const dp = useDispatch()

  useEffect(() => {
    if (me.data?._id && role === 'CLIENT') {
      dp(actions.getReportsClients(me.data?._id))
    }
  }, [me.data, role, dp])

  const state = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.reportsClient
  )

  return {
    ...state,
  }
}

export const useGetCompletedMissions = () => {
  const { role, me } = useGetUser()
  const socket = useContext(SocketContext)

  const dp = useDispatch()

  useEffect(() => {
    const fetch = () => {
      if (me.data?._id && role === 'EXPERT') {
        dp(actions.getCompletedMissions(me.data?._id))
      }
    }
    fetch()
    socket.socket.on('reportDone', data => {
      fetch()
    })
  }, [me.data, role, dp])

  const state = useSelector(
    (state: { reservations: ReservationsState }) =>
      state.reservations.completedMissions
  )

  return {
    ...state,
  }
}

export const useMissionRequest = () => {
  const dp = useDispatch()

  const state = useSelector((state: { reservations: ReservationsState }) => ({
    accept: state.reservations.acceptMission,
    reject: state.reservations.rejectMission,
  }))

  return {
    ...state,
    acceptMission: (id: string) => {
      dp(actions.acceptMission(id))
    },
    rejectMission: (id: string) => {
      dp(actions.rejectMission(id))
    },
  }
}
