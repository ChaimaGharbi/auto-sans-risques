import { Reducer } from 'app/store/utils'
import toast from 'react-hot-toast'
import { constants, ReservationsState } from '.'

const initialState: ReservationsState = {
  mission: {
    data: null,
    loading: false,
    errors: [],
  },
  createReclamation: {
    loading: false,
    error: null,
    open: false,
  },
  reportsClient: {
    data: [],
    loading: false,
    errors: [],
  },
  reclamations: {
    data: [],
    loading: false,
    errors: [],
  },
  missionsRequests: {
    data: [],
    loading: false,
    errors: [],
  },
  myReservations: {
    data: [],
    loading: false,
    errors: [],
  },
  ongoingMissions: {
    data: [],
    loading: false,
    errors: [],
  },
  completedMissions: {
    data: [],
    loading: false,
    errors: [],
  },
  acceptMission: {
    loading: false,
    errors: [],
  },
  rejectMission: {
    loading: false,
    errors: [],
  },
}

export const reservationsReducer = new Reducer(initialState)
  .on(constants.OPEN_CREATE_RECLAMATION, state => {
    state.createReclamation.open = true
  })
  .on(constants.CLOSE_CREATE_RECLAMATION, state => {
    state.createReclamation.open = false
  })
  .on(constants.CREATE_RECLAMATION.request, state => {
    state.createReclamation.loading = true
    state.createReclamation.error = []
  })
  .on(constants.CREATE_RECLAMATION.success, state => {
    state.createReclamation.loading = false
    state.createReclamation.error = []
    state.createReclamation.open = false
    toast.success('Reclamation créée avec succès')
  })
  .on(constants.CREATE_RECLAMATION.failure, state => {
    state.createReclamation.loading = false
    state.createReclamation.error = []
    toast.error('Une erreur est survenue lors de la création de la réclamation')
  })
  .on(constants.ACCEPT_MISSION.request, state => {
    state.acceptMission.loading = true
    state.acceptMission.errors = []
  })
  .on(constants.ACCEPT_MISSION.success, (state, action) => {
    state.acceptMission.loading = false
    state.acceptMission.errors = []
    toast.success('Mission accepted')
    state.missionsRequests.data =
      state.missionsRequests.data?.filter(
        mission => mission._id !== action.payload
      ) || []
  })
  .on(constants.ACCEPT_MISSION.failure, state => {
    state.acceptMission.loading = false
    state.acceptMission.errors = []
  })
  .on(constants.REJECT_MISSION.request, state => {
    state.rejectMission.loading = true
    state.rejectMission.errors = []
  })
  .on(constants.REJECT_MISSION.success, (state, action) => {
    state.rejectMission.loading = false
    state.rejectMission.errors = []
    toast.success('Mission rejected')
    state.missionsRequests.data =
      state.missionsRequests.data?.filter(
        mission => mission._id !== action.payload
      ) || []
  })
  .on(constants.REJECT_MISSION.failure, state => {
    state.rejectMission.loading = false
    state.rejectMission.errors = []
  })

  .on(constants.GET_MISSIONS_REQUESTS.request, state => {
    state.missionsRequests.loading = true
    state.missionsRequests.errors = []
  })
  .on(constants.GET_MISSIONS_REQUESTS.success, (state, action) => {
    state.missionsRequests.loading = false
    state.missionsRequests.data = action.payload.data
    state.missionsRequests.errors = []
  })
  .on(constants.GET_MISSIONS_REQUESTS.failure, state => {
    state.missionsRequests.loading = false
    state.missionsRequests.errors = []
  })

  .on(constants.GET_COMPLETED_MISSIONS.request, state => {
    state.completedMissions.loading = true
    state.completedMissions.errors = []
  })
  .on(constants.GET_COMPLETED_MISSIONS.success, (state, action) => {
    state.completedMissions.loading = false
    state.completedMissions.data = action.payload.data
    state.completedMissions.errors = []
  })
  .on(constants.GET_COMPLETED_MISSIONS.failure, state => {
    state.completedMissions.loading = false
    state.completedMissions.errors = []
  })

  .on(constants.GET_ONGOING_MISSIONS.request, state => {
    state.ongoingMissions.loading = true
    state.ongoingMissions.errors = []
  })
  .on(constants.GET_ONGOING_MISSIONS.success, (state, action) => {
    state.ongoingMissions.loading = false
    state.ongoingMissions.data = action.payload.data
    state.ongoingMissions.errors = []
  })
  .on(constants.GET_ONGOING_MISSIONS.failure, state => {
    state.ongoingMissions.loading = false
    state.ongoingMissions.errors = []
  })

  .on(constants.GET_MY_RESERVATIONS.request, state => {
    state.myReservations.loading = true
    state.myReservations.errors = []
  })
  .on(constants.GET_MY_RESERVATIONS.success, (state, action) => {
    state.myReservations.loading = false
    state.myReservations.data = action.payload.data
    state.myReservations.errors = []
  })
  .on(constants.GET_MY_RESERVATIONS.failure, state => {
    state.myReservations.loading = false
    state.myReservations.errors = []
  })

  .on(constants.GET_MY_RECLAMATIONS.request, state => {
    state.reclamations.loading = true
    state.reclamations.errors = []
  })
  .on(constants.GET_MY_RECLAMATIONS.success, (state, action) => {
    state.reclamations.loading = false
    state.reclamations.data = action.payload.data
    state.reclamations.errors = []
  })
  .on(constants.GET_MY_RECLAMATIONS.failure, state => {
    state.reclamations.loading = false
    state.reclamations.errors = []
  })

  .on(constants.GET_REPORTS_CLIENT.request, state => {
    state.reportsClient.loading = true
    state.reportsClient.errors = []
  })
  .on(constants.GET_REPORTS_CLIENT.success, (state, action) => {
    state.reportsClient.loading = false
    state.reportsClient.data = action.payload.data?.filter(
      ({ status }) => status === 'COMPLETEE' || status === 'ACCEPTEE'
    )
    state.reportsClient.errors = []
  })
  .on(constants.GET_REPORTS_CLIENT.failure, state => {
    state.reportsClient.loading = false
    state.reportsClient.errors = []
  })

  .on(constants.GET_MISSION.request, state => {
    state.mission.loading = true
    state.mission.errors = []
  })
  .on(constants.GET_MISSION.success, (state, action) => {
    state.mission.loading = false

    state.mission.data = action.payload.data
    state.mission.errors = []
  })
  .on(constants.GET_MISSION.failure, state => {
    state.mission.loading = false
    state.mission.errors = []
  })

  .get()
