import { Reducer } from 'app/store/utils'
import toast from 'react-hot-toast'
import { constants, GlobalState } from '.'
const initialState: GlobalState = {
  buyCredits: {
    step: 'PICK_METHOD',
    pick: [0, 0, 0],
    amount: null,
    method: null,
  },
  packs: {
    loading: false,
    errors: [],
    data: [],
  },
}

function differentThan(i) {
  if (i == 0) return [i, 1, 2, 50]
  if (i == 1) return [i, 0, 2, 80]
  return [i, 0, 1, 400]
}

export const globalReducer = new Reducer(initialState)
  .on(constants.SELECT_AMOUNT, (state, action) => {
    const [i, j, k, amount] = differentThan(action.payload)
    state.buyCredits.pick[i] = 1
    state.buyCredits.pick[j] = 0
    state.buyCredits.pick[k] = 0
    state.buyCredits.amount = amount
  })
  .on(constants.PAY_WITH_CARD, state => {
    if (state.buyCredits.amount) {
      state.buyCredits.step = 'PAY_WITH_CARD'
    } else {
      toast.error('Tu dois selectionner un offre')
    }
  })
  .on(constants.PAY_WITH_TRANSFER, state => {
    if (state.buyCredits.amount) {
      state.buyCredits.step = 'PAY_WITH_TRANSFER'
    } else {
      toast.error('Tu dois selectionner un offre')
    }
  })
  .on(constants.GET_ALL_PACKS.success, (state, action) => {
    if (action.payload.data) {
      state.packs.data = action.payload.data
      state.packs.data.sort((a, b) => a.priority - b.priority)
    }
    state.packs.errors = []
    state.packs.loading = false
  })
  .on(constants.GET_ALL_PACKS.failure, (state, action) => {
    state.packs.errors = []
    state.packs.data = []
    state.packs.loading = false
    toast.error("Une erreur s'est produite")
  })
  .on(constants.GET_ALL_PACKS.request, state => {
    state.packs.loading = true
    state.packs.errors = []
  })
  .get()
