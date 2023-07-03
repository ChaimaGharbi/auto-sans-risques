import { Reducer } from 'app/store/utils'
import { constants, BlogState } from '.'

const initialState: BlogState = {
  categories: {
    data: [],
    loading: false,
    errors: [],
  },
  articles: {
    data: [],
    loading: false,
    errors: [],
    total: 0,
  },
  category: null,
  filter: {
    sortOrder: 'asc',
    sortField: 'priority',
    pageNumber: 1,
    pageSize: 9,
  },
  article: {
    data: null,
    loading: false,
    errors: [],
  },
}

export const blogReducer = new Reducer(initialState)
  .on(constants.GET_CATEGORIES.request, state => {
    state.categories.loading = true
    state.categories.errors = []
  })
  .on(constants.GET_CATEGORIES.success, (state, action) => {
    state.categories.loading = false
    state.categories.data = action.payload
    state.categories.errors = []
    if (action.payload.length > 0) {
      state.category = action.payload[0]._id
    }
  })
  .on(constants.GET_CATEGORIES.failure, state => {
    state.categories.loading = false
    state.categories.errors = []
  })
  .on(constants.GET_ARTICLES.request, state => {
    state.articles.loading = true
    state.articles.errors = []
  })
  .on(constants.GET_ARTICLES.success, (state, action) => {
    state.articles.loading = false
    state.articles.data = action.payload.entities
    state.articles.total = action.payload.totalCount
    state.articles.errors = []
  })
  .on(constants.GET_ARTICLES.failure, state => {
    state.articles.loading = false
    state.articles.errors = []
  })
  .on(constants.SWITCH_CATEGORY, (state, action) => {
    state.filter.pageNumber = 1
    state.category = action.payload
  })
  .on(constants.CHANGE_PAGE, (state, action) => {
    state.filter.pageNumber = action.payload
  })
  .on(constants.GET_ARTICLE.request, state => {
    state.article.loading = true
    state.article.errors = []
  })
  .on(constants.GET_ARTICLE.success, (state, action) => {
    state.article.loading = false
    state.article.data = action.payload
    state.article.errors = []
  })
  .on(constants.GET_ARTICLE.failure, state => {
    state.article.loading = false
    state.article.errors = []
  })
  .get()
