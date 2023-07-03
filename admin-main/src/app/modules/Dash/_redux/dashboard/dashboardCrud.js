import axios from "axios";

export const CUSTOMERS_URL = "api/dashboard";

axios.defaults.headers.post["Content-Type"] = "application/json";

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findDashboard() {
  return axios.get(process.env.REACT_APP_BASE_URL + "/stats");
}
