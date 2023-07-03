import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

// CREATE =>  POST: add a new mark to the server
export function createMark(mark) {
  
  return axios.post(process.env.REACT_APP_BASE_URL + "/models", mark);
}

export function getMarkById(markId) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/models/${markId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findMarks(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/models/paginate",
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the mark on the server
export function updateMark(mark) {
  return axios.put(
    process.env.REACT_APP_BASE_URL + `/models/${mark._id}`,
    mark
  );
}

// DELETE => delete the mark from the server
export function deleteMark(markId) {
  return axios.delete(process.env.REACT_APP_BASE_URL + `/models/${markId}`);
}

// DELETE Categories by ids
export function deleteMarks(ids) {
  
  return axios.post(process.env.REACT_APP_BASE_URL + `/models/delete`, { ids });
}
