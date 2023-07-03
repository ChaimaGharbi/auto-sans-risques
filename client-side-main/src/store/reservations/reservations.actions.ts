import { async } from 'app/store/utils'

export const constants = {
  GET_MISSIONS_REQUESTS: async('GET_MISSIONS_REQUESTS'),
  GET_ONGOING_MISSIONS: async('GET_ONGOING_MISSIONS'),
  GET_COMPLETED_MISSIONS: async('GET_COMPLETED_MISSIONS'),

  REJECT_MISSION: async('REJECT_MISSION'),
  ACCEPT_MISSION: async('ACCEPT_MISSION'),

  GET_MY_RESERVATIONS: async('GET_MY_RESERVATIONS'),
  GET_MY_RECLAMATIONS: async('GET_MY_RECLAMATIONS'),
  GET_REPORTS_CLIENT: async('GET_REPORTS_CLIENT'),

  CREATE_RECLAMATION: async('CREATE_RECLAMATION'),
  OPEN_CREATE_RECLAMATION: 'OPEN_CREATE_RECLAMATION',
  CLOSE_CREATE_RECLAMATION: 'CLOSE_CREATE_RECLAMATION',

  GET_MISSION: async('GET_MISSION'),

  CREATE_RAPPORT: async('CREATE_RAPPORT'),
}

export const getMission = id => ({
  type: constants.GET_MISSION.request,
  payload: id,
})

export const openCreateReclamation = () => ({
  type: constants.OPEN_CREATE_RECLAMATION,
})

export const closeCreateReclamation = () => ({
  type: constants.CLOSE_CREATE_RECLAMATION,
})

export const createReclamation = body => ({
  type: constants.CREATE_RECLAMATION.request,
  payload: body,
})

export const getReportsClients = id => ({
  type: constants.GET_REPORTS_CLIENT.request,
  payload: id,
})

export const getMyReclamations = id => ({
  type: constants.GET_MY_RECLAMATIONS.request,
  payload: id,
})

export const getMyReservations = id => ({
  type: constants.GET_MY_RESERVATIONS.request,
  payload: id,
})

export const acceptMission = id => ({
  type: constants.ACCEPT_MISSION.request,
  payload: id,
})

export const rejectMission = id => ({
  type: constants.REJECT_MISSION.request,
  payload: id,
})

export const getMissionsRequests = id => ({
  type: constants.GET_MISSIONS_REQUESTS.request,
  payload: id,
})

export const getOngoingMissions = id => ({
  type: constants.GET_ONGOING_MISSIONS.request,
  payload: id,
})

export const getCompletedMissions = id => ({
  type: constants.GET_COMPLETED_MISSIONS.request,
  payload: id,
})
