import { useSelector, useDispatch } from 'react-redux'
import { actions, ModelsState } from '.'
import { useEffect } from 'react'

export const useInitModels = () => {
  const dp = useDispatch()
  const getTopExperts = () => dp(actions.getModels())

  useEffect(() => {
    getTopExperts()
  }, [])
}

export const useModels = () => {
  const state = useSelector(
    (state: { models: ModelsState }) => state.models.models
  )

  return state
}
