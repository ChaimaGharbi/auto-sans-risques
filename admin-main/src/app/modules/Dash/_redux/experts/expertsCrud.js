import axios from "axios";

export const CUSTOMERS_URL = "api/experts";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getExpertById(expertId) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/expert/${expertId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findExperts(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/expert/paginate?group=false",
    queryParams
  );
}

// UPDATE => PUT: update the expert on the server
export function updateExpert(expert) {
  return axios.put(
    process.env.REACT_APP_BASE_URL + `/expert/${expert._id}`,
    expert
  );
}

// UPDATE Status
export function updateStatusForExperts(ids, status) {
  return axios.put(process.env.REACT_APP_BASE_URL + `/expert/status/ids`, {
    ids,
    status,
  });
}
