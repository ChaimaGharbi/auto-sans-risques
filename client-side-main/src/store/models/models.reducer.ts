import { Reducer } from 'app/store/utils'
import { constants, ModelsState } from '.'

const initialState: ModelsState = {
  models: {
    data: [],
    loading: false,
    errors: [],
  },
}

export const modelsReducer = new Reducer(initialState)
  .on(constants.GET_MODELS.request, state => {
    state.models.loading = true
    state.models.errors = []
  })
  .on(constants.GET_MODELS.success, (state, action) => {
    state.models.loading = false
    state.models.data = action.payload
    state.models.errors = []
  })
  .on(constants.GET_MODELS.failure, state => {
    state.models.loading = false
    state.models.errors = []
  })
  .get()
