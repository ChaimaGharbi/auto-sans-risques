import axios from "axios";

export const CUSTOMERS_URL = "api/articles";

axios.defaults.headers.post["Content-Type"] = "application/json";

// CREATE =>  POST: add a new article to the server
export function createArticle(article) {
  var bodyFormData = new FormData();
  bodyFormData.append("title", article.title);
  bodyFormData.append("content", article.content);
  bodyFormData.append("priority", article.priority);
  bodyFormData.append("articleImg", article.articleImg);
  bodyFormData.append("categoryId", article.categoryId);

  return axios.post(
    process.env.REACT_APP_BASE_URL + `/article/article`,
    bodyFormData,
    {
      headers: { "content-type": "multipart/form-data" },
    }
  );
}

export function getArticleById(articleId) {
  return axios.get(
    process.env.REACT_APP_BASE_URL + `/article/article/${articleId}`
  );
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findArticles(queryParams, articleId) {
  
  return axios.post(
    process.env.REACT_APP_BASE_URL +
      `/article/article/paginate/${articleId}?group=false`,
    JSON.stringify(queryParams)
  );
}

// UPDATE => PUT: update the article on the server
export function updateArticle(article) {
  var bodyFormData = new FormData();
  bodyFormData.append("title", article.title);
  bodyFormData.append("content", article.content);
  bodyFormData.append("priority", article.priority);
  bodyFormData.append("articleImg", article.articleImg);
  bodyFormData.append("categoryId", article.categoryId);

  return axios.put(
    process.env.REACT_APP_BASE_URL + `/article/article/${article._id}`,
    bodyFormData,
    {
      headers: { "content-type": "multipart/form-data" },
    }
  );
}

// DELETE => delete the article from the server
export function deleteArticle(articleId) {
  return axios.delete(
    process.env.REACT_APP_BASE_URL + `/article/article/${articleId}`
  );
}

// DELETE Articles by ids
export function deleteArticles(ids) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + `/article/article/deleteArticles`,
    { ids }
  );
}
