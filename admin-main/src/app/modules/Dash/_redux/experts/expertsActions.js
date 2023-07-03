import * as requestFromServer from "./expertsCrud";
import { expertsSlice, callTypes } from "./expertsSlice";

const { actions } = expertsSlice;

export const fetchExperts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  
  return requestFromServer
    .findExperts({
      ...queryParams,
      filter: {
        ...queryParams.filter,
        specialitiesModels: [],
      },
    })
    .then((response) => {
      

      if (response.data && response.data.entities) {
        const { totalCount, entities } = response.data;
        dispatch(actions.expertsFetched({ totalCount, entities }));
      } else {
        dispatch(
          actions.catchError({
            error: response.data.message,
            callType: callTypes.list,
          })
        );
      }
    })
    .catch((error) => {
      
      error.clientMessage = "Can't find experts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchExpert = (_id) => (dispatch) => {
  if (!_id) {
    return dispatch(actions.expertFetched({ expertForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getExpertById(_id)
    .then((response) => {
      const expert = response.data;
      dispatch(actions.expertFetched({ expertForEdit: expert }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find expert";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExpert = (expert) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateExpert(expert)
    .then(() => {
      dispatch(actions.expertUpdated({ expert }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update expert";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateExpertsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForExperts(ids, status)
    .then(() => {
      dispatch(actions.expertsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update experts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
