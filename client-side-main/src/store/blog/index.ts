import * as _actions from './blog.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface BlogState {
  categories: {
    data: Category[] | null
    loading: boolean
    errors: string[]
  }
  articles: {
    data: Article[] | null
    loading: boolean
    errors: string[]
    total: number
  }
  article: {
    data: Article | null
    loading: boolean
    errors: string[]
  }
  category: string | null
  filter: Filter
}

interface Category {
  _id: string
  category_name: string
}
interface Article {
  _id: string
  title: string
  content: string
  articleImg: string
  created_At: string
  category: Category[]
}

export type Filter = {
  filter?
  sortOrder?
  sortField?
  pageNumber?
  pageSize?
}
