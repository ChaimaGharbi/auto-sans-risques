import * as requestFromServer from "./questionsCrud";
import {questionsSlice, callTypes} from "./questionsSlice";

const {actions} = questionsSlice;

export const fetchQuestions = (queryParams,countryId) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findQuestions(queryParams,countryId)
    .then(response => {
      
      const { totalCount, entities } = response.data;
      dispatch(actions.questionsFetched({ totalCount, entities }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't find questions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchQuestion = _id => dispatch => {
  if (!_id) {
    return dispatch(actions.questionFetched({ questionForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getQuestionById(_id)
    .then(response => {
      const question = response.data;
      dispatch(actions.questionFetched({ questionForEdit: question }));
    })
    .catch(error => {
      error.clientMessage = "Can't find question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQuestion = _id => dispatch => {
  

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQuestion(_id)
    .then(response => {
      dispatch(actions.questionDeleted({ _id }));
    })
    .catch(error => {
      error.clientMessage = "Can't cancel question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createQuestion = questionForCreation => dispatch => {
  
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createQuestion(questionForCreation)
    .then(response => {
      const { question } = response.data;
      dispatch(actions.questionCreated({ question }));
    })
    .catch(error => {
      error.clientMessage = "Can't create question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateQuestion = question => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateQuestion(question)
    .then(() => {
      dispatch(actions.questionUpdated({ question }));
    })
    .catch(error => {
      error.clientMessage = "Can't update question";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteQuestions = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteQuestions(ids)
    .then(() => {
      dispatch(actions.questionsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete questions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
