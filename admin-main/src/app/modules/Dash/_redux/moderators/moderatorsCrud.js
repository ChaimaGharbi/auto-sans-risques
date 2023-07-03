import axios from "axios";

//export const CUSTOMERS_URL = "api/moderator";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getModeratorById(moderatorId) {
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/moderator/${moderatorId}`
  );
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findModerators(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/moderator/paginate",
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the ad on the server
export function updateModerator(moderator) {
  /* var bodyFormData = new FormData();
  bodyFormData.append("title", moderator.title);
  bodyFormData.append("body", moderator.body);
  bodyFormData.append("url", moderator.url);
  bodyFormData.append("img", moderator.img);
  bodyFormData.append("typeUser", moderator.typeUser);
  bodyFormData.append("isActive", moderator.isActive); */
  moderator.roles = "MODERATOR";

  return axios.put(
    process.env.REACT_APP_BASE_URL + `/moderator/${moderator._id}`,
    moderator
    /* {
      headers: { "content-type": "multipart/form-data" },
    } */
  );
}

export function createModerator(moderator) {
  
  moderator.roles = "MODERATOR";
  /*  var bodyFormData = new FormData();
  bodyFormData.append("title", moderator.title);
  bodyFormData.append("body", moderator.body); */
  /*  bodyFormData.append("url", moderator.url);
  bodyFormData.append("img", moderator.img);
  bodyFormData.append("typeUser", moderator.typeUser); */
  //bodyFormData.append("userId", moderator.userId);

  return axios.post(
    process.env.REACT_APP_BASE_URL + `/auth/signup/moderator`,
    moderator
  );
  //return axios.post(process.env.REACT_APP_BASE_URL + `/moderator`, ad);
}

// DELETE => delete the ad from the server
export function deleteModerator(moderatorId) {
  return axios.delete(
    process.env.REACT_APP_BASE_URL + `/moderator/${moderatorId}`
  );
}

// DELETE ads by ids
export function deleteModerators(ids) {
  return axios.post(process.env.REACT_APP_BASE_URL + `/moderator/delete`, {
    ids,
  });
}
