import { async } from 'app/store/utils'
import { Filter } from '.'

export const constants = {
  GET_CATEGORIES: async('GET_CATEGORIES'),
  GET_ARTICLES: async('GET_ARTICLES'),
  SWITCH_CATEGORY: 'SWITCH_CATEGORY',
  GET_ARTICLE: async('GET_ARTICLE'),
  CHANGE_PAGE: 'CHANGE_PAGE',
}

export const switchCategory = (category: string) => {
  return {
    type: constants.SWITCH_CATEGORY,
    payload: category,
  }
}

export const changePage = (pageNumber: number) => {
  return {
    type: constants.CHANGE_PAGE,
    payload: pageNumber,
  }
}

export const getCategories = () => ({
  type: constants.GET_CATEGORIES.request,
})

export const getArticles = (category, filter: Filter) => ({
  type: constants.GET_ARTICLES.request,
  payload: {
    category,
    filter,
  },
})

export const getArticle = (id: string) => ({
  type: constants.GET_ARTICLE.request,
  payload: id,
})
