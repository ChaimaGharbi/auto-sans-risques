import axios from "axios";

export const CUSTOMERS_URL = "api/rapports";

axios.defaults.headers.post["Content-Type"] = "application/json";

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findRapports(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/rapport/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE Status
export function updateStatusForRapports(ids, etat) {
  return axios.put(
    process.env.REACT_APP_BASE_URL + `/rapport/rapport/state/ids`,
    {
      ids,
      etat,
    }
  );
}
