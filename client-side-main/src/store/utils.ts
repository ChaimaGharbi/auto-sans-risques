import produce from 'immer'
import { call, put, takeLatest } from 'redux-saga/effects'
export { push as redirect } from 'redux-first-history'

export type AsyncActionType = {
  failure: string
  success: string
  request: string
  reset: string
}

export type Action = {
  type: string
  payload?: any
  artifact?: any
  [key: string]: any
}

export const async = (actionName: string) => ({
  failure: `${actionName}_FAILURE`,
  request: `${actionName}_REQUEST`,
  success: `${actionName}_SUCCESS`,
  reset: `${actionName}_RESET`,
})

export class Reducer<State> {
  handlers = new Map<String, (State, Action) => void>()
  constructor(private state: State) {}

  on(type: string | string[], handler: (state: State, action: Action) => void) {
    if (Array.isArray(type)) {
      type.forEach(t => this.handlers.set(t, handler))
    } else {
      this.handlers.set(type, handler)
    }
    return this
  }

  get() {
    return (_state = this.state, action: Action) => {
      const handler = this.handlers.get(action.type)
      if (handler) {
        return produce(_state, state => {
          handler(state, action)
        })
      }

      return _state
    }
  }
}

export class Saga {
  private dispatchedOnFail = (err: any) => ({
    type: 'unknown',
  })
  private dispatchedOnSuccess: ((data: any, action?: Action) => Action)[] = []

  private job = (action: Action) => {}
  constructor(private trigger: string) {}

  catch(handler: string | Action | ((err: any) => Action)) {
    if (typeof handler === 'function') this.dispatchedOnFail = handler
    else if (typeof handler === 'string')
      this.dispatchedOnFail = () => ({
        type: handler,
      })
    else this.dispatchedOnFail = () => handler
    return this
  }

  then(handler: string | Action | ((data: any, action?: Action) => Action)) {
    if (typeof handler === 'function') this.dispatchedOnSuccess.push(handler)
    else if (typeof handler === 'string')
      this.dispatchedOnSuccess.push(() => ({ type: handler }))
    else this.dispatchedOnSuccess.push(() => handler)
    return this
  }

  do<Fn extends (...args: any) => any>(
    cb: (action: Action) => [fn: Fn, ...args: Parameters<Fn>]
  ) {
    this.job = function* (action: Action) {
      return yield call(...cb(action))
    }
    return this
  }

  get() {
    const trigger = this.trigger
    const job = this.job
    const dispatchedOnFail = this.dispatchedOnFail
    const handlers = this.dispatchedOnSuccess
    return function* () {
      yield takeLatest(trigger, function* login(action: Action) {
        try {
          let response
          if (job) {
            response = yield job(action)
          }
          for (const handler of handlers) {
            yield put(handler(response, action))
          }
        } catch (e: any) {
          yield put(dispatchedOnFail(e))
        }
      })
    }
  }
}
