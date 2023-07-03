import axios from "axios";

export const CUSTOMERS_URL = "api/assistances";

axios.defaults.headers.post["Content-Type"] = "application/json";

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findAssistances(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/assistance/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE Status
export function updateStatusForAssistances(ids, etat) {
  return axios.put(process.env.REACT_APP_BASE_URL + `/assistance/state/ids`, {
    ids,
    etat,
  });
}
