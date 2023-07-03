import { Formiz, useForm } from '@formiz/core'
import If from 'app/shared/components/If'
import { FiUser as Avatar } from 'react-icons/fi'
import moment from 'moment'
import {
  useGetQuestions,
  useGetResponses,
  useCreateResponse,
  useSubmitReport,
} from 'app/store/hooks'
import Loading from 'app/shared/components/Loading'
import Section from './Section'
import UploadImages from './Upload'
import { FiUpload as UploadIcon } from 'react-icons/fi'
export default function Report({ comment, date, client }) {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const { loading } = useCreateResponse('', '', '')
  const questions = useGetQuestions()
  const submitReport = useSubmitReport()
  useGetResponses()
  const form = useForm()
  const onSubmit = () => {
    submitReport.submit()
  }
  if (questions.loading) return <Loading />
  return (
    <div className="divide-y grid gap-y-4">
      <User
        fullName={client.fullName}
        date={date}
        commentaire={comment}
        image={client.img}
      />
      <div className="py-4">
        <Formiz connect={form} onValidSubmit={onSubmit}>
          <div className="w-full grid grid-cols-5 pb-3">
            {questions.data?.map((step, idx) => (
              <div key={step._id} className="grid place-content-center">
                <button
                  className={`
                font-black text-[#788995] uppercase font-roboto px-2 py-4 cursor-pointer
                ${
                  step.category_name === form.currentStep?.name
                    ? 'border-b-4 border-primary !text-primary'
                    : ''
                }
                `}
                  onClick={() => form.goToStep(step.category_name)}
                >
                  {idx + 1}
                  <div className="text-[10px] sm:text-[14px]">
                    {step.category_name}
                  </div>
                </button>
              </div>
            ))}
          </div>
          <form noValidate onSubmit={form.submitStep} className="">
            {questions.data?.map(step =>
              step.category_name == 'Importer des images' ? (
                <UploadImages key={step._id} />
              ) : (
                <Section
                  key={step._id}
                  id={step._id}
                  questions={step.questions}
                  title={step.category_name}
                  {...step}
                />
              )
            )}

            <div className="flex gap-4 items-center justify-between py-3">
              <If test={form.isFirstStep}>
                <div />
                <button
                  type="submit"
                  disabled={
                    (!form.isStepValid && form.isSubmitted) || !!loading
                  }
                  className="text-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white font-black font-roboto hover:text-white block shadow-button disabled:bg-opacity-20 disabled:shadow-none"
                  onClick={goToTop}
                >
                  SUIVANT
                </button>
              </If>
              <If test={!form.isFirstStep && form.isLastStep}>
                <button
                  type="button"
                  onClick={() => {
                    form.prevStep()
                    goToTop()
                  }}
                  className="text-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white font-black font-roboto hover:text-white block shadow-button disabled:bg-opacity-20 disabled:shadow-none"
                  disabled={!!loading}
                >
                  RETOUR
                </button>
                <button
                  className="text-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white font-black font-roboto hover:text-white block shadow-button disabled:bg-opacity-20 disabled:shadow-none"
                  type="submit"
                  disabled={
                    (!form.isValid && form.isSubmitted) ||
                    !!loading ||
                    submitReport.loading
                  }
                >
                  Soumettre
                </button>
              </If>
              <If test={!form.isFirstStep && !form.isLastStep}>
                <button
                  type="button"
                  onClick={() => {
                    form.prevStep()
                    goToTop()
                  }}
                  className="text-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white font-black font-roboto hover:text-white block shadow-button disabled:bg-opacity-20 disabled:shadow-none"
                  disabled={!!loading}
                >
                  Previous
                </button>
                <button
                  className="text-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white font-black font-roboto hover:text-white block shadow-button disabled:bg-opacity-20 disabled:shadow-none"
                  type="submit"
                  disabled={
                    (!form.isStepValid && form.isSubmitted) || !!loading
                  }
                  onClick={goToTop}
                >
                  Continue
                </button>
              </If>
            </div>
          </form>
        </Formiz>
      </div>
    </div>
  )
}
const User = ({ image, commentaire, fullName, date }) => {
  return (
    <div className="grid py-2">
      <div className="flex items-center space-x-4 py-2 ">
        <If test={!!image}>
          <img className="rounded-full w-14 h-14" src={image} alt="profile" />
        </If>
        <If test={!image}>
          <Avatar className="m-0 w-14 h-14 text-[#868686]" />
        </If>
        <div className="grid ">
          <h1 className="font-medium m-0 font-roboto">{fullName}</h1>
          <span className="text-[#47495A] uppercase font-roboto">
            {moment(date).format('DD MMMM YYYY - HH:mm')}
          </span>
        </div>
      </div>
      <p className="font-medium font-roboto text-[#212B36]">{commentaire}</p>
    </div>
  )
}
