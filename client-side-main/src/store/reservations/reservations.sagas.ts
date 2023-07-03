import { Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './reservations.service'
import { constants as reportConstants } from '../report/report.actions'

export const createReclamation = new Saga(constants.CREATE_RECLAMATION.request)
  .do(action => [api.createReclamation, action.payload])
  .then(constants.CREATE_RECLAMATION.success)
  .catch(constants.CREATE_RECLAMATION.failure)
  .get()

export const getMission = new Saga(constants.GET_MISSION.request)
  .do(action => [api.getMission, action.payload])
  .then(response => {
    return {
      type: constants.GET_MISSION.success,
      payload: {
        data: response,
      },
    }
  })
  .then(response => {
    return {
      type: reportConstants.GET_REPORT.request,
      payload: response[0].rapportId,
    }
  })
  .catch(constants.GET_MISSION.failure)
  .get()

export const getReportsClient = new Saga(constants.GET_REPORTS_CLIENT.request)
  .do(action => [api.getReportsClient, action.payload])
  .then(response => {
    return {
      type: constants.GET_REPORTS_CLIENT.success,
      payload: {
        data: response.entities,
      },
    }
  })
  .catch(constants.GET_REPORTS_CLIENT.failure)
  .get()

export const getMyReclamations = new Saga(constants.GET_MY_RECLAMATIONS.request)
  .do(action => [api.getMyReclamations, action.payload])
  .then(response => {
    return {
      type: constants.GET_MY_RECLAMATIONS.success,
      payload: {
        data: response.entities,
      },
    }
  })
  .catch(constants.GET_MY_RECLAMATIONS.failure)
  .get()

export const getMyReservations = new Saga(constants.GET_MY_RESERVATIONS.request)
  .do(action => [api.getMyReservations, action.payload])
  .then(response => {
    return {
      type: constants.GET_MY_RESERVATIONS.success,
      payload: {
        data: response.entities,
      },
    }
  })
  .catch(constants.GET_MY_RESERVATIONS.failure)
  .get()

export const getMissionsRequests = new Saga(
  constants.GET_MISSIONS_REQUESTS.request
)
  .do(action => [api.getMissionsRequests, action.payload])
  .then(response => {
    return {
      type: constants.GET_MISSIONS_REQUESTS.success,
      payload: {
        data: response.entities,
      },
    }
  })
  .catch(constants.GET_MISSIONS_REQUESTS.failure)
  .get()

export const getOngoingMissions = new Saga(
  constants.GET_ONGOING_MISSIONS.request
)
  .do(action => [api.getOngoingMissions, action.payload])
  .then(response => {
    return {
      type: constants.GET_ONGOING_MISSIONS.success,
      payload: {
        data: response.entities,
      },
    }
  })
  .catch(constants.GET_ONGOING_MISSIONS.failure)
  .get()

export const getCompletedMissions = new Saga(
  constants.GET_COMPLETED_MISSIONS.request
)
  .do(action => [api.getCompletedMissions, action.payload])
  .then(response => {
    return {
      type: constants.GET_COMPLETED_MISSIONS.success,
      payload: {
        data: response.entities,
      },
    }
  })
  .catch(constants.GET_COMPLETED_MISSIONS.failure)
  .get()

export const createRapport = new Saga(constants.CREATE_RAPPORT.request)
  .do(action => [api.createRapport, action.payload])
  .then((_, action) => {
    return {
      type: constants.ACCEPT_MISSION.success,
      payload: action?.payload.reservationId,
    }
  })
  .catch(constants.ACCEPT_MISSION.failure)
  .get()

export const acceptMission = new Saga(constants.ACCEPT_MISSION.request)
  .do(action => [api.updateReservation, action.payload, 'ACCEPTEE'])
  .then(response => {
    return {
      type: constants.CREATE_RAPPORT.request,
      payload: {
        clientId: response.clientId,
        expertId: response.expertId,
        reservationId: response._id,
        etat: 'en attente',
      },
    }
  })
  .catch(constants.ACCEPT_MISSION.failure)
  .get()

export const rejectMission = new Saga(constants.REJECT_MISSION.request)
  .do(action => [api.updateReservation, action.payload, 'REFUSEE'])
  .then((_, action) => {
    return {
      type: constants.REJECT_MISSION.success,
      payload: action?.payload,
    }
  })
  .catch(constants.REJECT_MISSION.failure)
  .get()
