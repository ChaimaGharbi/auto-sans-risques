import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions, GlobalState } from '.'

export function useBuyCredits() {
  const dp = useDispatch()

  const state = useSelector(
    (state: { global: GlobalState }) => state.global.buyCredits
  )

  const select = i => {
    dp(actions.select(i))
  }

  const payWithCard = () => dp(actions.payWithCard())
  const payWithTransfer = () => dp(actions.payWithTransfer())

  return {
    ...state,
    select,
    payWithCard,
    payWithTransfer,
  }
}

export function useGetAllPacks() {
  const dp = useDispatch()

  const state = useSelector(
    (state: { global: GlobalState }) => state.global.packs
  )

  useEffect(() => {
    dp(actions.getAllPacks())
  }, [])

  return state
}
