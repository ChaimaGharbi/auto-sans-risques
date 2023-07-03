import * as requestFromServer from "./rapportcategoriesCrud";
import {rapportcategoriesSlice, callTypes} from "./rapportcategoriesSlice";

const {actions} = rapportcategoriesSlice;

export const fetchRapportcategories = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRapportcategories(queryParams)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.rapportcategoriesFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find rapportcategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRapportcategory = _id => dispatch => {
  if (!_id) {
    return dispatch(actions.rapportcategoryFetched({ rapportcategoryForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRapportcategoryById(_id)
    .then(response => {
      const rapportcategory = response.data;
      dispatch(actions.rapportcategoryFetched({ rapportcategoryForEdit: rapportcategory }));
    })
    .catch(error => {
      error.clientMessage = "Can't find rapportcategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRapportcategory = _id => dispatch => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRapportcategory(_id)
    .then(response => {
      dispatch(actions.rapportcategoryDeleted({ _id }));
    })
    .catch(error => {
      error.clientMessage = "Can't cancel rapportcategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createRapportcategory = rapportcategoryForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRapportcategory(rapportcategoryForCreation)
    .then(response => {
      const rapportcategory  = response.data;
      dispatch(actions.rapportcategoryCreated({ rapportcategory }));
    })
    .catch(error => {
      error.clientMessage = "Can't create rapportcategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRapportcategory = rapportcategory => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRapportcategory(rapportcategory)
    .then(() => {
      dispatch(actions.rapportcategoryUpdated({ rapportcategory }));
    })
    .catch(error => {
      error.clientMessage = "Can't update rapportcategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRapportcategories = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRapportcategories(ids)
    .then(() => {
      dispatch(actions.rapportcategoriesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete rapportcategories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
