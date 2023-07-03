import axios from "axios";

export const CUSTOMERS_URL = "api/models";

axios.defaults.headers.post["Content-Type"] = "application/json";

// CREATE =>  POST: add a new model to the server
export function createModel(model) {
  //var bodyFormData = new FormData();
  //bodyFormData.append("title", model.title);
  //bodyFormData.append("content", model.content);
  // bodyFormData.append("priority", model.priority);
  // bodyFormData.append("modelImg", model.modelImg);
  // bodyFormData.append("categoryId", model.categoryId);
  
  return axios.post(process.env.REACT_APP_BASE_URL + `/marks`, model);
}

export function getModelById(modelId) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/marks/${modelId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findModels(queryParams, modelId) {
  
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + `/marks/model/${modelId}`,
    queryParams
  );
}

// UPDATE => PUT: update the model on the server
export function updateModel(model) {
  
  
  /*  var bodyFormData = new FormData();
  bodyFormData.append("title", model.title);
  bodyFormData.append("content", model.content);
  bodyFormData.append("priority", model.priority);
  bodyFormData.append("modelImg", model.modelImg);
  bodyFormData.append("categoryId", model.categoryId); */

  return axios.put(
    process.env.REACT_APP_BASE_URL + `/marks/${model._id}`,
    model
  );
}

// DELETE => delete the model from the server
export function deleteModel(modelId) {
  return axios.delete(process.env.REACT_APP_BASE_URL + `/marks/${modelId}`);
}

// DELETE models by ids
export function deleteModels(ids) {
  return axios.post(process.env.REACT_APP_BASE_URL + `/marks/delete`, { ids });
}
