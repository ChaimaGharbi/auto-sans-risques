import { useState, useEffect, useMemo } from 'react'
import { Formiz, useForm, useField } from '@formiz/core'
import { useForgotPassword } from 'app/store/hooks'
import { isRequired, isEmail } from '@formiz/validations'
import If from '../If'

const ForgetPasssword = ({ switchToLogin }) => {
  const { loading, forgotPassword, data, reset } = useForgotPassword()
  const form = useForm()

  useEffect(() => {
    return () => reset()
  }, [])

  const onSubmit = ({ email }) => {
    forgotPassword(email)
  }

  return (
    <div className="bg-white rounded-md ">
      <div className="bg-primary rounded-t-md grid place-content-center p-3">
        <img src="/big-logo.svg" alt="Logo" className="h-20" />
      </div>
      <div className="rounded p-10 grid gap-y-4">
        <h1 className="font-medium text-xl text-center">Mot de passe oublié</h1>

        <Formiz connect={form} onValidSubmit={onSubmit}>
          <If test={!data}>
            <form noValidate onSubmit={form.submit} className="">
              <div className="grid gap-y-4">
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  validations={[
                    {
                      rule: isRequired(),
                      message: 'Ce champ est obligatoire',
                    },
                    {
                      rule: isEmail(),
                      message: "Ceci n'est pas un e-mail valide",
                    },
                  ]}
                  className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 py-3">
                <div />
                <button
                  className="button"
                  type="submit"
                  disabled={(!form.isValid && form.isSubmitted) || loading}
                >
                  Submit
                </button>
              </div>
            </form>
          </If>
          <If test={!!data}>{data}</If>
          <div>
            <button className="underline font-semibold" onClick={switchToLogin}>
              S'authentifier{' '}
            </button>{' '}
          </div>
        </Formiz>
      </div>
    </div>
  )
}

export default ForgetPasssword

function Input(props) {
  const { errorMessage, isValid, setValue, value, id, isSubmitted } =
    useField(props)

  const error = useMemo(() => !isValid && isSubmitted, [isValid, isSubmitted])
  const required = useMemo(
    () =>
      props.validations?.some(v => v.message === 'Ce champ est obligatoire'),
    [props.validations]
  )

  return (
    <div>
      <input
        className={props.className}
        value={value ?? ''}
        onChange={e => setValue(e.target.value)}
        id={id}
        type={props.type}
        placeholder={`${props.placeholder} ${!!required && ' *'}`}
        aria-invalid={error}
        aria-required={!!required}
      />
      <If test={error}>
        <span className="text-red-500 text-xs">{errorMessage}</span>
      </If>
    </div>
  )
}
