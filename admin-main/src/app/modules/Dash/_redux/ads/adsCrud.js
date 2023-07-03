import axios from "axios";

//export const CUSTOMERS_URL = "api/ads";

axios.defaults.headers.post["Content-Type"] = "application/json";

export function getAdById(adId) {
  return axios.get(process.env.REACT_APP_BASE_URL + `/ads/${adId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findAds(queryParams) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL + "/ads/paginate",
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the ad on the server
export function updateAd(ad) {
  var bodyFormData = new FormData();
  bodyFormData.append("title", ad.title);
  bodyFormData.append("body", ad.body);
  bodyFormData.append("url", ad.url);
  bodyFormData.append("img", ad.img);
  bodyFormData.append("typeUser", ad.typeUser);
  bodyFormData.append("isActive", ad.isActive);

  return axios.put(
    process.env.REACT_APP_BASE_URL + `/ads/${ad._id}`,
    bodyFormData,
    {
      headers: { "content-type": "multipart/form-data" },
    }
  );
}

export function createAd(ad) {
  
  var bodyFormData = new FormData();
  bodyFormData.append("title", ad.title);
  bodyFormData.append("body", ad.body);
  bodyFormData.append("url", ad.url);
  bodyFormData.append("img", ad.img);
  bodyFormData.append("typeUser", ad.typeUser);
  //bodyFormData.append("userId", ad.userId);

  return axios.post(process.env.REACT_APP_BASE_URL + `/ads`, bodyFormData, {
    headers: { "content-type": "multipart/form-data" },
  });
  //return axios.post(process.env.REACT_APP_BASE_URL + `/ads`, ad);
}

// DELETE => delete the ad from the server
export function deleteAd(adId) {
  return axios.delete(process.env.REACT_APP_BASE_URL + `/ads/${adId}`);
}

// DELETE ads by ids
export function deleteAds(ids) {
  return axios.post(process.env.REACT_APP_BASE_URL + `/ads/delete`, { ids });
}
