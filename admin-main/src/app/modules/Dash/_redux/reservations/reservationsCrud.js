import axios from "axios";

export const CUSTOMERS_URL = "api/reservations";

axios.defaults.headers.post["Content-Type"] = "application/json";

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findReservations(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/reservation/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE Status
export function updateStatusForReservations(ids, etat) {
  return axios.put(process.env.REACT_APP_BASE_URL + `/reservation/state/ids`, {
    ids,
    etat,
  });
}
