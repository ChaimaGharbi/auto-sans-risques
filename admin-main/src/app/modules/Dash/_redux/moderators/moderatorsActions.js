import * as requestFromServer from "./moderatorsCrud";
import { moderatorsSlice, callTypes } from "./moderatorsSlice";

const { actions } = moderatorsSlice;

export const fetchModerators = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findModerators(queryParams)
    .then((response) => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.moderatorsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      
      error.clientMessage = "Can't find moderators";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const createModerator = (moderator) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createModerator(moderator)
    .then((response) => {
      const moderator = response.data;
      dispatch(actions.moderatorCreated({ moderator }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create moderator";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchModerator = (_id) => (dispatch) => {
  if (!_id) {
    return dispatch(actions.moderatorFetched({ moderatorForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getModeratorById(_id)
    .then((response) => {
      const moderator = response.data;
      dispatch(actions.moderatorFetched({ moderatorForEdit: moderator }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find moderator";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteModerator = (_id) => (dispatch) => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteModerator(_id)
    .then((response) => {
      dispatch(actions.moderatorDeleted({ _id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete moderator";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateModerator = (moderator) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateModerator(moderator)
    .then((response) => {
      const moderator = response.data;
      
      dispatch(actions.moderatorUpdated({ moderator }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update moderator";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteModerators = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteModerators(ids)
    .then(() => {
      dispatch(actions.moderatorsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete moderators";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
