import { useSelector, useDispatch } from 'react-redux'
import { actions, BlogState } from '.'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const useArticle = () => {
  const { id } = useParams()
  const dp = useDispatch()
  const getArticle = () => dp(actions.getArticle(id ? id : ''))
  const state = useSelector((state: { blog: BlogState }) => state.blog.article)
  useEffect(() => {
    getArticle()
  }, [])

  return state
}

export const useBlog = () => {
  const dp = useDispatch()
  const { category, articles, categories, filter } = useSelector(
    (state: { blog: BlogState }) => ({
      articles: state.blog.articles,
      categories: state.blog.categories,
      category: state.blog.category,
      filter: state.blog.filter,
    })
  )

  const getCategories = () => dp(actions.getCategories())
  const getArticles = () => dp(actions.getArticles(category, filter))
  const handleSwitchGategory = category => dp(actions.switchCategory(category))
  const changePage = pageNumber => dp(actions.changePage(pageNumber))

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (category) {
      getArticles()
    }
  }, [category, filter.pageNumber])

  return {
    articles,
    categories,
    handleSwitchGategory,
    pagination: {
      page: filter.pageNumber,
      onChange: changePage,
      pageSize: filter.pageSize,
      total: articles.total,
    },
  }
}
