import * as requestFromServer from "./rapportsCrud";
import {rapportsSlice, callTypes} from "./rapportsSlice";

const {actions} = rapportsSlice;

export const fetchRapports = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRapports(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.rapportsFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find rapports";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


export const updateRapportsStatus = (ids, etat) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRapports(ids, etat)
    .then(() => {
      dispatch(actions.rapportsStatusUpdated({ ids, etat }));
    })
    .catch(error => {
      error.clientMessage = "Can't update rapports status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
