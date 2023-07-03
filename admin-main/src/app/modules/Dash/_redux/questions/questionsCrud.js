import axios from "axios";

export const CUSTOMERS_URL = "api/questions";

axios.defaults.headers.post["Content-Type"] = "application/json";

// CREATE =>  POST: add a new question to the server
export function createQuestion(question) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/rapport/question",
    question
  );
}

export function getQuestionById(questionId) {
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/rapport/question/${questionId}`
  );
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findQuestions(queryParams, questionId) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL +
      `/rapport/question/paginate/${questionId}?group=false`,
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the question on the server
export function updateQuestion(question) {
  return axios.put(
    process.env.REACT_APP_BASE_URL + `/rapport/question/${question._id}`,
    question
  );
}

// DELETE => delete the question from the server
export function deleteQuestion(questionId) {
  return axios.delete(
    process.env.REACT_APP_BASE_URL + `/rapport/question/${questionId}`
  );
}

// DELETE Questions by ids
export function deleteQuestions(ids) {
  return axios.post(process.env.REACT_APP_BASE_URL + `/rapport/question/ids`, {
    ids,
  });
}
