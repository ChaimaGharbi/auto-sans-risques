import axios from "axios";

export const CUSTOMERS_URL = "api/clients";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getClientById(clientId) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/client/${clientId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findClients(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/client/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the client on the server
export function updateClient(client) {
  return axios.put(
    process.env.REACT_APP_BASE_URL + `/client/${client._id}`,
    client
  );
}

// UPDATE Status
export function updateStatusForClients(ids, status) {
  return axios.put(process.env.REACT_APP_BASE_URL + `/client/status/ids`, {
    ids,
    status,
  });
}
