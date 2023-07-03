import axios from "axios";

export const CUSTOMERS_URL = "api/categories";

axios.defaults.headers.post["Content-Type"] = "application/json";

// CREATE =>  POST: add a new category to the server
export function createCategory(category) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/article/category",
    category
  );
}

export function getCategoryById(categoryId) {
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/article/category/${categoryId}`
  );
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCategories(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/article/category/paginate?group=false",
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the category on the server
export function updateCategory(category) {
  return axios.put(
    process.env.REACT_APP_BASE_URL + `/article/category/${category._id}`,
    category
  );
}

// DELETE => delete the category from the server
export function deleteCategory(categoryId) {
  return axios.delete(
    process.env.REACT_APP_BASE_URL + `/article/category/${categoryId}`
  );
}

// DELETE Categories by ids
export function deleteCategories(ids) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + `/article/category/deleteCategories`,
    { ids }
  );
}
