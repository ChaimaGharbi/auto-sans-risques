import { Formiz, useForm, FormizStep, useField, FieldProps } from '@formiz/core'
import If from '../If'
import GeneralInfo from './GeneralInfo'
import Role from './Role'
import AddressInfo from './AddressInfo'
import ExpertInfo from './ExpertInfo'
import { useSignup } from 'app/store/hooks'

export default function MultiStepForm({ switchToLogin }) {
  const form = useForm()

  const { signup, loading, error, done, data } = useSignup()

  const onSubmit = data => {
    data.role = data.role
    console.log(data);
    data.lng = JSON.parse(data.position)[1];
    data.lat =  JSON.parse(data.position)[0];
    signup(data)
  }

  return (
    <Formiz connect={form} onValidSubmit={onSubmit}>
      <If test={done}>
        <div>{data}</div>
      </If>
      <If test={!done}>
        <form noValidate onSubmit={form.submitStep} className="">
          <div className="text-red-500">{error}</div>
          <GeneralInfo />
          <Role />
          <AddressInfo />
          <ExpertInfo matchRole={form.values.role === 'EXPERT'} />
          <div className="grid grid-cols-2 py-3">
            <If test={form.isFirstStep}>
              <div />
              <button
                className="button"
                type="submit"
                disabled={(!form.isStepValid && form.isSubmitted) || loading}
              >
                Continue
              </button>
            </If>

            <If test={!form.isFirstStep && form.isLastStep}>
              <button type="button" onClick={form.prevStep} className="link">
                Previous
              </button>
              <button
                className="button"
                type="submit"
                disabled={(!form.isValid && form.isSubmitted) || loading}
              >
                Submit
              </button>
            </If>

            <If test={!form.isFirstStep && !form.isLastStep}>
              <button type="button" onClick={form.prevStep} className="link">
                Previous
              </button>
              <button
                className="button"
                type="submit"
                disabled={(!form.isStepValid && form.isSubmitted) || loading}
              >
                Continue
              </button>
            </If>
          </div>
        </form>
      </If>
      <div>
        J'ai déja un compte,{' '}
        <button className="underline font-semibold" onClick={switchToLogin}>
          S'authentifier{' '}
        </button>{' '}
      </div>
    </Formiz>
  )
}
