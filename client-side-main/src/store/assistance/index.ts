import * as _actions from './assistance.actions'

// const fireAskForAssistance = payload => dispatch => {
//   dispatch(slice.actions.askForAssistanceLaunch())
//   return axios
//     .post(`/assistance`, payload)
//     .then(({ data }) => data)
//     .then(() => {
//       dispatch(slice.actions.askForAssistanceSuccess())
//     })
//     .catch(() => dispatch(slice.actions.askForAssistanceError()))
// }

// export default slice

const { constants, ...actions } = _actions

export { constants, actions }

export interface AssistanceState {
  loading: boolean
  body: Body | null
}

export interface Body {
  tel: string
}
