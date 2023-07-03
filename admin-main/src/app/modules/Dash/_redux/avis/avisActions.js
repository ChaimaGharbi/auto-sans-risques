import * as requestFromServer from "./avisCrud";
import {avisSlice, callTypes} from "./avisSlice";

const {actions} = avisSlice;

export const fetchAvis = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAvis(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.avisFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find avis";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAvisDetails = _id => dispatch => {
  if (!_id) {
    return dispatch(actions.avisDetailsFetched({ avisDetails: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAvisDetailsById(_id)
    .then(response => {
      const avis = response.data;
      dispatch(actions.avisDetailsFetched({ avisDetails: avis }));
    })
    .catch(error => {
      error.clientMessage = "Can't load avis details";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAviss = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAviss(ids)
    .then(() => {
      dispatch(actions.avissDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete avis";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const deleteAvisById = _id => dispatch => {

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAvisById(_id)
    .then(response => {
      dispatch(actions.avisDeleted({ _id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete avis";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAvisStatus = (ids, etat) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAvis(ids, etat)
    .then(() => {
      dispatch(actions.avisStatusUpdated({ ids, etat }));
    })
    .catch(error => {
      error.clientMessage = "Can't update avis status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

