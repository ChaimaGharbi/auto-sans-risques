import axios from 'app/store/api'
import { Filter } from '.'

export const getCategories = () =>
  axios.get(`/article/category`).then(({ data }) => data)

export const getArticles = (category: string, filter: Filter) =>
  axios
    .post(`/article/article/paginate/${category}`, filter)
    .then(({ data }) => data)

export const getArticle = (id: string) =>
  axios.get(`/article/article/${id}`).then(({ data }) => data)
