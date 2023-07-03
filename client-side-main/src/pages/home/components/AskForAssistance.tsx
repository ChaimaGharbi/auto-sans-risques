import { Formiz, useForm } from '@formiz/core'
import { isLength, isPattern, isRequired } from '@formiz/validations'
import { validators } from 'app/pages/settings/components/FormStructure'
import If from 'app/shared/components/If'
import { Spinner } from 'app/shared/components/Loading'
import Input from 'app/shared/components/Register/Input'
import { phone } from 'app/shared/components/Register/validators'
import { useAskForAssistance } from 'app/store/hooks'

const AskForAssistance = () => {
  const form = useForm()

  const { state, askForAssistance } = useAskForAssistance()

  const onSubmit = e => {
    console.log(e)
    const assistance = {
      tel: e.tel,
    }
    askForAssistance(assistance)
    form.reset()
  }
  return (
    <div>
      <div  className="relative -top-32"></div>

      <div className="huge:px-[50rem] py-10 bg-[#DFE2EB]">
        <div className="grid grid-cols-1 xs:grid-cols-3 huge:grid-cols-2 items-center">
          {/*  md:grid-cols-3 2xl:grid-cols-1 */}
          <img
            src="/img/car-ask-assistance.png"
            alt="car"
            className="hidden xxs:grid huge:hidden"
          />
          {/* xl:hidden */}
          <div className="px-10 col-span-2 mx-auto">
            <h1 className="text-2xl lg:text-4xl font-bold pb-10 text-black">
              Vous voulez acheter une voiture d'occasion ? <br />
              Nous avons les meilleures voitures certifiées !
            </h1>

            <div className="max-w-2xl rounded-md overflow-hidden shadow-lg bg-white"  id="assistance">
              <div className="p-4 sm:p-10 ">
                <h1 className="text-xl lg:text-2xl pb-8 text-black">
                  Un de nos experts vous appellera dans moins de 24h pour vous
                  aider à localiser votre besoin.
                </h1>
                <div className="flex flex-col justify-center items-center lg:flex-row md:flex-row  ">
                  <Formiz connect={form} onValidSubmit={onSubmit}>
                    <form
                      noValidate
                      onSubmit={form.submit}
                      className="flex flex-col w-full justify-center "
                      id="phone-input"
                    >
                      <Input
                        placeholder="Numéro de téléphone"
                        required
                        type="tel"
                        name="tel"
                        validations={[
                          {
                            rule: isPattern(/^\+?[0-9\s\-\(\)]+$/),
                            message:
                              'Ce champ doit être un numéro de téléphone valide',
                          },
                          {
                            rule: isLength(8),
                            message: 'Ce champs doit contenir 8 chiffres',
                          },
                          {
                            rule: isRequired(),
                            message: 'Ce champs est obligatoire!',
                          },
                        ]}
                        className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none my-4"
                      />

                      <button
                        disabled={state.loading}
                        type="submit"
                        className="button "
                      >
                        <If test={state.loading}>
                          <Spinner />
                        </If>
                        <If test={!!state.loading}>Envoyé</If>
                        <If test={!state.loading}>Demander assistance</If>
                      </button>
                    </form>
                  </Formiz>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskForAssistance
