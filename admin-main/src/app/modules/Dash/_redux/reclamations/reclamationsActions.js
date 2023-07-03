import * as requestFromServer from "./reclamationsCrud";
import {reclamationsSlice, callTypes} from "./reclamationsSlice";

const {actions} = reclamationsSlice;

export const fetchReclamations = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findReclamations(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.reclamationsFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find reclamations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchReclamationDetails = _id => dispatch => {
  if (!_id) {
    return dispatch(actions.reclamationDetailsFetched({ reclamationDetails: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getReclamationDetailsById(_id)
    .then(response => {
      const reclamation = response.data;
      dispatch(actions.reclamationDetailsFetched({ reclamationDetails: reclamation }));
    })
    .catch(error => {
      error.clientMessage = "Can't load reclamation details";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateReclamationsStatus = (ids, etat) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForReclamations(ids, etat)
    .then(() => {
      dispatch(actions.reclamationsStatusUpdated({ ids, etat }));
    })
    .catch(error => {
      error.clientMessage = "Can't update reclamations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

