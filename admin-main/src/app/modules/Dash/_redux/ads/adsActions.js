import * as requestFromServer from "./adsCrud";
import { adsSlice, callTypes } from "./adsSlice";

const { actions } = adsSlice;

export const fetchAds = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAds(queryParams)
    .then((response) => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.adsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      
      error.clientMessage = "Can't find ads";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createAd = (ad) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAd(ad)
    .then((response) => {
      const ad = response.data;
      dispatch(actions.adCreated({ ad }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create ad";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchAd = (_id) => (dispatch) => {
  if (!_id) {
    return dispatch(actions.adFetched({ adForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAdById(_id)
    .then((response) => {
      const ad = response.data;
      dispatch(actions.adFetched({ adForEdit: ad }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find ad";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAd = (_id) => (dispatch) => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAd(_id)
    .then((response) => {
      dispatch(actions.adDeleted({ _id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete ad";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAd = (ad) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAd(ad)
    .then((response) => {
      const ad = response.data;
      
      dispatch(actions.adUpdated({ ad }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update ad";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAds(ids)
    .then(() => {
      dispatch(actions.adsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete ads";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
