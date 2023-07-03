import axios from "axios";

export const CUSTOMERS_URL = "api/rapportcategories";

axios.defaults.headers.post["Content-Type"] = "application/json";

// CREATE =>  POST: add a new rapportcategory to the server
export function createRapportcategory(rapportcategory) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/rapport/questionCtg",
    rapportcategory
  );
}

export function getRapportcategoryById(rapportcategoryId) {
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/rapport/questionCtg/${rapportcategoryId}`
  );
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findRapportcategories(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL +
      "/rapport/questionCtg/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the rapportcategory on the server
export function updateRapportcategory(rapportcategory) {
  return axios.put(
    process.env.REACT_APP_BASE_URL +
      `/rapport/questionCtg/${rapportcategory._id}`,
    rapportcategory
  );
}

// DELETE => delete the rapportcategory from the server
export function deleteRapportcategory(rapportcategoryId) {
  return axios.delete(
    process.env.REACT_APP_BASE_URL + `/rapport/questionCtg/${rapportcategoryId}`
  );
}

// DELETE Rapportcategories by ids
export function deleteRapportcategories(ids) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + `/rapport/questionCtg/ids`,
    { ids }
  );
}
