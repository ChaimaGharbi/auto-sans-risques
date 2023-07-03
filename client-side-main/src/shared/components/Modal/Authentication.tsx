import Modal from '.'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'app/store/hooks'
import { toast } from 'react-hot-toast'

const AuthenticationModal = ({ open, onClose }) => {
  const push = useNavigate()
  const { login, state } = useLogin()

  const [modalForm, setModalForm] = useState('LOGIN')
  const switchToLogin = () => setModalForm('LOGIN')
  const switchToRegister = () => setModalForm('REGISTER')
  const switchForgotPassword = () => setModalForm('FORGOT_PASSWORD')

  useEffect(() => {
    switchToLogin()
  }, [open])

  const onSubmitLoginForm = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    login(data.email.toString(), data.password.toString())
  }

  if (!open) return null

  if (modalForm === 'LOGIN') {
    return (
      <Modal
        open={open}
        onClose={onClose}
        className="!w-[90%] md:!w-1/2 lg:!w-1/3 xl:!w-1/4"
      >
        <div className="bg-primary rounded-t-md grid place-content-center p-3">
          <img src="/big-logo.svg" alt="Logo" className="h-20" />
        </div>
        <form
          onSubmit={onSubmitLoginForm}
          method="POST"
          className="bg-white rounded-b-md p-4 md:px-10 grid gap-y-4"
        >
          <h1 className="font-medium text-xl text-center">Se Connecter</h1>
          <input
            required
            type="email"
            name="email"
            className={`
            bg-[#F0F0F0] w-full p-4 text-sm
            placeholder-[#BFBFBF]
            focus:outline-none
            rounded 
        `}
            placeholder="Email"
          />
          <input
            name="password"
            required
            type="password"
            className={`
            bg-[#F0F0F0] w-full p-4 text-sm
            placeholder-[#BFBFBF]
            focus:outline-none
            rounded 
        `}
            placeholder="Password"
          />
          <div>
            {state.errors.map(error => (
              <p className="text-red-500 text-sm m-0 p-0" key={error}>
                {error}
              </p>
            ))}
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={switchForgotPassword}
              className="text-[#B5A9A9] underline underline-offset-1"
            >
              Mot de passe oublié
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="reset"
              onClick={onClose}
              className="button bg-[#F0F0F0] text-black shadow-none hover:text-black"
            >
              Annuler
            </button>
            <button className="button " disabled={state.loading}>
              Valider
            </button>
          </div>
          <div>
            Créer nouveau compte,{' '}
            <button
              onClick={switchToRegister}
              className="underline font-semibold"
            >
              Inscrivez-vous
            </button>
          </div>
        </form>
      </Modal>
    )
  } else if (modalForm === 'FORGOT_PASSWORD') {
    return (
      <Modal
        open={open}
        onClose={onClose}
        className="!w-[90%] md:!w-1/2 lg:!w-1/3 xl:!w-1/4"
      >
        <ForgotPassword switchToLogin={switchToLogin} />
      </Modal>
    )
  } else
    return (
      <Modal
        open={open}
        onClose={onClose}
        className="!w-[90%] md:!w-1/2 lg:!w-1/3 xl:!w-1/4"
      >
        <Signup onClose={onClose} switchToLogin={switchToLogin} />
      </Modal>
    )
}

export default AuthenticationModal
