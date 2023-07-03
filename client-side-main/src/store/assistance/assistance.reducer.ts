import { constants, AssistanceState } from '.'
import toast from 'react-hot-toast'
import { Reducer } from 'app/store/utils'

const initialState: AssistanceState = {
  loading: false,
  body: null,
}

export const assistanceReducer = new Reducer(initialState)
  .on(constants.ASK_FOR_ASSISTANCE.request, state => {
    state.loading = true
  })
  .on(constants.ASK_FOR_ASSISTANCE.success, state => {
    state.loading = false
    toast.success("Votre demande d'assistance a bien été envoyée", {
      duration: 5000, // Duration in milliseconds
    })
  })
  .on(constants.ASK_FOR_ASSISTANCE.failure, state => {
    state.loading = false
    toast.error("Une erreur est survenue lors de la demande d'assistance")
  })
  //   .on(constants.RESET, state => {
  //     // state.count = 0
  //   })
  //   .on(constants.INCREMENT, state => {
  //     // state.count++
  //   })
  //   .on(constants.ADD, (state, action) => {
  //     // state.count += action.payload.amount
  //   })
  .get()
