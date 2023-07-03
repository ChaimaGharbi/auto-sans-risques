import axios from "axios";

export const CUSTOMERS_URL = "api/reclamations";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getReclamationDetailsById(reclamationId) {
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/reclamation/${reclamationId}`
  );
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findReclamations(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/reclamation/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE Status
export function updateStatusForReclamations(ids, etat) {
  return axios.put(process.env.REACT_APP_BASE_URL + `/reclamation/state/ids`, {
    ids,
    etat,
  });
}
