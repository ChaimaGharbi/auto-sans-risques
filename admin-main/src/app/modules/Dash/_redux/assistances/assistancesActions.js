import * as requestFromServer from "./assistancesCrud";
import {assistancesSlice, callTypes} from "./assistancesSlice";

const {actions} = assistancesSlice;

export const fetchAssistances = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAssistances(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.assistancesFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find assistances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


export const updateAssistancesStatus = (ids, etat) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAssistances(ids, etat)
    .then(() => {
      dispatch(actions.assistancesStatusUpdated({ ids, etat }));
    })
    .catch(error => {
      error.clientMessage = "Can't update assistances status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
