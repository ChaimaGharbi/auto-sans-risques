import * as _actions from './global.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface GlobalState {
  buyCredits: {
    step: 'PICK_METHOD' | 'PAY_WITH_CARD' | 'PAY_WITH_TRANSFER'
    amount: null | number
    pick: number[]
    method: null | 'CARD' | 'TRANSFER'
  }

  packs: {
    loading: boolean
    errors: string[]
    data: Pack[]
  }
}

interface Pack {
  _id: string
  nb_missions: number
  prix: number
  priority: number
}
