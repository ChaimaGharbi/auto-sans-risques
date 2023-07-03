import * as requestFromServer from "./articlesCrud";
import { articlesSlice, callTypes } from "./articlesSlice";

const { actions } = articlesSlice;

export const fetchArticles = (queryParams, countryId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findArticles(queryParams, countryId)
    .then((response) => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.articlesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      
      error.clientMessage = "Can't find articles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchArticle = (_id) => (dispatch) => {
  if (!_id) {
    return dispatch(actions.articleFetched({ articleForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getArticleById(_id)
    .then((response) => {
      const article = response.data;
      dispatch(actions.articleFetched({ articleForEdit: article }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find article";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteArticle = (_id) => (dispatch) => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteArticle(_id)
    .then((response) => {
      dispatch(actions.articleDeleted({ _id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't cancel article";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createArticle = (articleForCreation) => (dispatch) => {
  
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createArticle(articleForCreation)
    .then((response) => {
      const article = response.data;
      
      dispatch(actions.articleCreated({ article }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create article";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateArticle = (article) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateArticle(article)
    .then(() => {
      dispatch(actions.articleUpdated({ article }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update article";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteArticles = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteArticles(ids)
    .then(() => {
      dispatch(actions.articlesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete articles";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
