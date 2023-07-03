import axios from "axios";

export const CUSTOMERS_URL = "api/packs";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getPackById(packId) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/pack/${packId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPacks(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/pack/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the pack on the server
export function updatePack(pack) {
  return axios.put(process.env.REACT_APP_BASE_URL + `/pack/${pack._id}`, pack);
}

export function createPack(pack) {
  return axios.post(process.env.REACT_APP_BASE_URL + `/pack`, pack);
}

// DELETE => delete the pack from the server
export function deletePack(packId) {
  return axios.delete(process.env.REACT_APP_BASE_URL + `/pack/${packId}`);
}

// DELETE Packs by ids
export function deletePacks(ids) {
  return axios.post(process.env.REACT_APP_BASE_URL + `/pack/delete`, { ids });
}
