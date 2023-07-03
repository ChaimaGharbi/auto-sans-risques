import { Formiz, useForm } from '@formiz/core'
import Container from 'app/shared/components/Container'
import { useParams } from 'react-router-dom'
import { useResetPassword } from 'app/store/hooks'
import Input from 'app/shared/components/Register/Input'
import * as validators from 'app/shared/components/Register/validators'
import If from 'app/shared/components/If'

const ResetPassword = () => {
  const form = useForm()
  const { resetPassword, loading, errors, done } = useResetPassword()

  const handleSubmit = data => {
    resetPassword(data.password)
    form.reset()
  }

  return (
    <Container>
      <div className="py-40">
        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Réinitialiser mon mot de passe
          </div>

          <Container>
            <div className="grid gap-y-4 divide-y">
              <Formiz connect={form} onValidSubmit={handleSubmit}>
                <form
                  noValidate
                  onSubmit={form.submit}
                  className="p-4 md:p-10 grid gap-4"
                >
                  <If test={done}>
                    <div className="text-center">
                      Votre mot de passe a été réinitialisé avec succès.
                    </div>
                  </If>
                  <div className="text-red-500">{errors?.map(e => e)}</div>

                  <div>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Nouveau Mot de passe"
                      className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                      validations={[validators.required]}
                    />
                  </div>

                  <div className="flex justify-end items-center gap-4 ">
                    <div></div>
                    <button
                      className="button"
                      type="submit"
                      disabled={(!form.isValid && form.isSubmitted) || loading}
                    >
                      Envoyez
                    </button>
                  </div>
                </form>
              </Formiz>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default ResetPassword
