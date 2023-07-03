import axios from "axios";

export const CUSTOMERS_URL = "api/avis";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getAvisDetailsById(avisId) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/avis/${avisId}`);
}

export function deleteAvisById(avisId) {
  return axios.delete(process.env.REACT_APP_BASE_URL + `/avis/${avisId}`);
}

export function deleteAviss(ids) {
  return axios.post(process.env.REACT_APP_BASE_URL + `/avis/delete/ids`, {
    ids,
  });
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findAvis(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/avis/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE Status
export function updateStatusForAvis(ids, etat) {
  return axios.put(process.env.REACT_APP_BASE_URL + `/avis/state/ids`, {
    ids,
    etat,
  });
}
