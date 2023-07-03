import * as requestFromServer from "./modelsCrud";
import { modelsSlice, callTypes } from "./modelsSlice";

const { actions } = modelsSlice;

export const fetchModels = (queryParams, countryId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findModels(queryParams, countryId)
    .then((response) => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.modelsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      
      error.clientMessage = "Can't find models";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchModel = (_id) => (dispatch) => {
  if (!_id) {
    return dispatch(actions.modelFetched({ modelForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getModelById(_id)
    .then((response) => {
      const model = response.data;
      dispatch(actions.modelFetched({ modelForEdit: model }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find model";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteModel = (_id) => (dispatch) => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteModel(_id)
    .then((response) => {
      dispatch(actions.modelDeleted({ _id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't cancel model";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createModel = (modelForCreation) => (dispatch) => {
  
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createModel(modelForCreation)
    .then((response) => {
      const model = response.data;
      dispatch(actions.modelCreated({ model }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create model";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateModel = (model) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateModel(model)
    .then(() => {
      dispatch(actions.modelUpdated({ model }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update model";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteModels = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteModels(ids)
    .then(() => {
      dispatch(actions.modelsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete models";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
