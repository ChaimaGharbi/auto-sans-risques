import { Saga } from 'app/store/utils'
import { constants } from '.'
import * as api from './blog.service'

export const getCategoriesSaga = new Saga(constants.GET_CATEGORIES.request)
  .do(() => [api.getCategories])
  .then(response => {
    return {
      type: constants.GET_CATEGORIES.success,
      payload: response,
    }
  })
  .catch(constants.GET_CATEGORIES.failure)
  .get()

export const getArticlesSaga = new Saga(constants.GET_ARTICLES.request)
  .do(action => [
    api.getArticles,
    action.payload.category,
    action.payload.filter,
  ])
  .then(response => {
    return {
      type: constants.GET_ARTICLES.success,
      payload: response,
    }
  })
  .catch(constants.GET_ARTICLES.failure)
  .get()

export const getArticleSaga = new Saga(constants.GET_ARTICLE.request)
  .do(action => [api.getArticle, action.payload])
  .then(response => {
    return {
      type: constants.GET_ARTICLE.success,
      payload: response,
    }
  })
  .catch(constants.GET_ARTICLE.failure)
  .get()
