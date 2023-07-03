import * as requestFromServer from "./packsCrud";
import {packsSlice, callTypes} from "./packsSlice";

const {actions} = packsSlice;

export const fetchPacks = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPacks(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.packsFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find packs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createPack = pack => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPack(pack)
    .then((response) => {
      const pack = response.data;
      dispatch(actions.packCreated({ pack }));
    })
    .catch(error => {
      error.clientMessage = "Can't create pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchPack = _id => dispatch => {
  if (!_id) {
    return dispatch(actions.packFetched({ packForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPackById(_id)
    .then(response => {
      const pack = response.data;
      dispatch(actions.packFetched({ packForEdit: pack }));
    })
    .catch(error => {
      error.clientMessage = "Can't find pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const deletePack = _id => dispatch => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePack(_id)
    .then(response => {
      dispatch(actions.packDeleted({ _id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePack = pack => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePack(pack)
    .then(() => {
      dispatch(actions.packUpdated({ pack }));
    })
    .catch(error => {
      error.clientMessage = "Can't update pack";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const deletePacks = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePacks(ids)
    .then(() => {
      dispatch(actions.packsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete packs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
