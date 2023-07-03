import { useSelector, useDispatch } from 'react-redux'
import { actions, AuthenticationState } from '.'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const useUpdateExpert = () => {
  const dp = useDispatch()
  const state = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.updateExpertsData
  )

  const update = (prefix, data) => {
    if (prefix === 'expert') dp(actions.updateExpertsData(data))
    else dp(actions.updateClientsData(data))
  }

  return { ...state, update }
}

export const useResetPassword = () => {
  const { token } = useParams()
  const dp = useDispatch()
  const state = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.resetPassword
  )

  const resetPassword = (password: string) => {
    dp(actions.resetPassword(token, password))
  }

  return { ...state, resetPassword }
}

export const useForgotPassword = () => {
  const dp = useDispatch()
  const state = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.forgotPassword
  )
  const forgotPassword = (email: string) => {
    dp(actions.forgotPassword(email))
  }

  const reset = () => {
    dp(actions.forgotPasswordReset())
  }

  return { ...state, forgotPassword, reset }
}

export const useUpdatePassword = () => {
  const state = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.updatePassword
  )

  const {
    me: { data },
  } = useGetUser()
  const dp = useDispatch()

  const updatePassword = useCallback(
    (oldPassword: string, newPassword: string) => {
      if (data && data._id) {
        dp(
          actions.updatePassword({
            role: data.role,
            old: oldPassword,
            new: newPassword,
          })
        )
      }
    },
    [data, dp]
  )

  return { ...state, updatePassword }
}

export const useGetUser = () => {
  const state = useSelector((state: { auth: AuthenticationState }) => ({
    me: state.auth.me,
    isLogged: state.auth.isAuthenticated,
    role: state.auth.me.data?.role,
  }))

  return state
}

export const useLogout = () => {
  const dp = useDispatch()
  const logout = () => dp(actions.logout())
  return logout
}

export const useUpdateToUpload = () => {
  const dp = useDispatch()
  const upload = (role, body) => dp(actions.updateByUpload(role, body))
  const state = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.updateByUpload
  )

  return { ...state, upload }
}

export const useDropDown = () => {
  const dp = useDispatch()
  const toggleDropDown = () => dp(actions.toggleDropDown())
  const closeDropDown = () => dp(actions.closeDropDown())
  const open = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.extra.dropDown
  )

  return { open, toggleDropDown, closeDropDown }
}

export const useAuthenticationModal = () => {
  const dp = useDispatch()
  const toggleModal = () => dp(actions.toggleModal())
  const closeModal = () => dp(actions.closeModal())
  const openModal = () => dp(actions.openModal())
  const open = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.extra.modal
  )

  return { open, toggleModal, closeModal, openModal }
}

export const useLoadUser = () => {
  const dp = useDispatch()
  const loadUser = () => dp(actions.getMe())

  useEffect(() => {
    loadUser()
  }, [])
}

// export const useGetUser = () =>
//   useAuthenticate(
//     state => ({
//       me: state.state.me,
//       isLogged: state.state.isLogged,
//       role: state.role,
//     }),
//     shallow
//   )

// export const useCounter = () => {
//   const dp = useDispatch()

//   const reset = () => dp(actions.reset())
//   const increment = () => dp(actions.increment())
//   const add = (amount: number) => dp(actions.add(amount))
//   const state = useSelector(
//     (state: { counter: AuthenticationState }) => state.counter
//   )

//   return {
//     state,
//     reset,
//     increment,
//     add,
//   }
// }

// export const useRequestLoadingUser = () => {
//   return useAuthenticate(state => state.getUser)
// }

export const useLogin = () => {
  const dp = useDispatch()
  const login = (email: string, password: string) => {
    dp(actions.login(email, password))
  }

  const state = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.login
  )
  return {
    state,
    login,
  }
}

export const useSignup = () => {
  const dp = useDispatch()
  const signup = data => {
    dp(actions.signup(data))
  }

  const state = useSelector(
    (state: { auth: AuthenticationState }) => state.auth.signup
  )
  return {
    signup,
    ...state,
  }
}

export const useAvailability = () => {
  const dp = useDispatch()
  useEffect(() => {
    dp(actions.getAvailability())
  }, [])

  const setRepos = useCallback(
    (data: any) => {
      dp(actions.setRepos(data))
    },
    [dp]
  )

  const setRecurrent = useCallback(
    data => {
      dp(actions.setRecurrent(data))
    },
    [dp]
  )

  const resetAvailability = useCallback(() => {
    dp(actions.resetAvailability())
  }, [dp])

  const createAvailability = useCallback(
    data => {
      dp(actions.createAvailability(data))
    },
    [dp]
  )

  const state = useSelector((state: { auth: AuthenticationState }) => ({
    availability: state.auth.availability,
    repos: state.auth.setRepo,
    recurrent: state.auth.setRecurrent,
    resetAvailability: state.auth.resetAvailability,
    createAvailability: state.auth.createAvailability,
  }))
  return {
    ...state.availability,
    setRepos: {
      ...state.repos,
      setRepos,
    },
    setRecurrent: {
      ...state.recurrent,
      setRecurrent,
    },
    resetAvailability: {
      ...state.resetAvailability,
      resetAvailability,
    },
    createAvailability: {
      ...state.createAvailability,
      createAvailability,
    },
  }
}
