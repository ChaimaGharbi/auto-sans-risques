import * as requestFromServer from "./marksCrud";
import { marksSlice, callTypes } from "./marksSlice";

const { actions } = marksSlice;

export const fetchMarks = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMarks(queryParams)
    .then((response) => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.marksFetched({ totalCount, entities }));
    })
    .catch((error) => {
      
      error.clientMessage = "Can't find marks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMark = (_id) => (dispatch) => {
  if (!_id) {
    return dispatch(actions.markFetched({ markForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMarkById(_id)
    .then((response) => {
      const mark = response.data;
      dispatch(actions.markFetched({ markForEdit: mark }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find mark";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMark = (_id) => (dispatch) => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMark(_id)
    .then((response) => {
      dispatch(actions.markDeleted({ _id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't cancel mark";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createMark = (markForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMark(markForCreation)
    .then((response) => {
      const mark = response.data;
      dispatch(actions.markCreated({ mark }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create mark";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMark = (mark) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMark(mark)
    .then(() => {
      dispatch(actions.markUpdated({ mark }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update mark";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMarks = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMarks(ids)
    .then(() => {
      dispatch(actions.marksDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete categories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
