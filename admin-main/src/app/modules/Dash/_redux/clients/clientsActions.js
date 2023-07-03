import * as requestFromServer from "./clientsCrud";
import {clientsSlice, callTypes} from "./clientsSlice";

const {actions} = clientsSlice;

export const fetchClients = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findClients(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.clientsFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find clients";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchClient = _id => dispatch => {
  if (!_id) {
    return dispatch(actions.clientFetched({ clientForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getClientById(_id)
    .then(response => {
      const client = response.data;
      dispatch(actions.clientFetched({ clientForEdit: client }));
    })
    .catch(error => {
      error.clientMessage = "Can't find client";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const updateClient = client => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateClient(client)
    .then(() => {
      dispatch(actions.clientUpdated({ client }));
    })
    .catch(error => {
      error.clientMessage = "Can't update client";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateClientsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForClients(ids, status)
    .then(() => {
      dispatch(actions.clientsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update clients status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

