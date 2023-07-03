import * as requestFromServer from "./reservationsCrud";
import {reservationsSlice, callTypes} from "./reservationsSlice";

const {actions} = reservationsSlice;

export const fetchReservations = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findReservations(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.reservationsFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find reservations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


export const updateReservationsStatus = (ids, etat) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForReservations(ids, etat)
    .then(() => {
      dispatch(actions.reservationsStatusUpdated({ ids, etat }));
    })
    .catch(error => {
      error.clientMessage = "Can't update reservations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
