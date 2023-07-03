import * as _actions from './reservations.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface ReservationsState {
  mission: {
    data: any
    loading: boolean
    errors: any[]
  }

  createReclamation: {
    loading: boolean
    error: string[] | null
    open: boolean
  }

  reclamations: {
    data: any[] | null
    loading: boolean
    errors: string[]
  }

  reportsClient: {
    data: any[] | null
    loading: boolean
    errors: string[]
  }

  missionsRequests: {
    data: any[] | null
    loading: boolean
    errors: string[]
  }

  myReservations: {
    data: any[] | null
    loading: boolean
    errors: string[]
  }

  acceptMission: {
    loading: boolean
    errors: string[]
  }

  rejectMission: {
    loading: boolean
    errors: string[]
  }

  ongoingMissions: {
    data: any[] | null
    loading: boolean
    errors: string[]
  }
  completedMissions: {
    data: any[]
    loading: boolean
    errors: string[]
  }
}
