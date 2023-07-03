import * as _actions from './models.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface ModelsState {
  models: {
    data: Model | null
    loading: boolean
    errors: string[]
  }
}

type Model = any
