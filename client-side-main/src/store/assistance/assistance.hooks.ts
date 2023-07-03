import { useSelector, useDispatch } from 'react-redux'
import { actions, AssistanceState } from '.'

export const useAskForAssistance = () => {
  const state = useSelector(
    (state: { assistance: AssistanceState }) => state.assistance
  )
  const dp = useDispatch()

  const askForAssistance = data => dp(actions.askForAssistance(data))

  return {
    state,
    askForAssistance,
  }
}
