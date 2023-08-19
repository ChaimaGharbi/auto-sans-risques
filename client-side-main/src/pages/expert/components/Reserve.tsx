// import { Input, DatePicker, Radio, Form } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import { useCreateReservation } from 'app/store/hooks'
import { MarksPicker } from 'app/shared/components/ModelsAndMarks'
import Input from 'app/shared/components/Register/Input'
import * as validators from 'app/shared/components/Register/validators'
import Picker from 'app/shared/components/Datepicker'
import { Formiz, useForm, useField } from '@formiz/core'
import If from 'app/shared/components/If'
import Modal from 'app/shared/components/Modal'
import { ScheduleMeeting } from 'react-schedule-meeting'
import { Button } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { getClient } from 'app/store/api'
import { useParams } from 'react-router-dom'
import { fr } from 'date-fns/locale';

function InputPicker(props) {
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
      <Picker
        placeholder="Jusqu'au"
        className="!font-rubik dt-picker w-full !h-12 huge:!h-20 !text-lg !text-black !bg-white !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900 cursor-pointer border border-[#C4CDD5]"
        value={value ?? ''}
        onChange={e => setValue(e)}
        id={id}
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
        }}
      />
      <If test={error}>
        <span className="text-red-500 text-xs">{errorMessage}</span>
      </If>
    </div>
  )
}
const Reserve = () => {
  const [modal, setModal] = useState(false)
  const closeModal = () => setModal(false)
  const openModal = () => setModal(true)
  return (
    <div className="bg-white">
      <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
        reserve votre visite
      </div>
      <div className="hidden md:block">
        <Form closeModal={closeModal} />
      </div>
      <div className="block md:hidden">
        <div className="p-4">
          <button className="button w-full" onClick={openModal}>
            Demander un rendez-vous
          </button>
          <Modal
            open={modal}
            onClose={closeModal}
            className="bg-white !w-[90%] md:!w-1/2 lg:!w-1/3 xl:!w-1/4 z-[2002] shadow border rounded-md"
          >
            <Form closeModal={closeModal} />
          </Modal>
        </div>
      </div>
    </div>
  )
}
interface Timeslot {
  id: number
  startHour: string
  endHour: string
}
function Form({ closeModal }) {
  const form = useForm()
  const { id } = useParams()
  const { state, createReservation } = useCreateReservation()
  const [model, setModel] = useState('')
  const [mark, setMark] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [reservationTime, setReservationTime] = useState<Date | undefined>(
    undefined
  )
  interface DisponibilityState {
    recurrent: boolean
    dispos: Array<any>
  }

  const [disponibility, setDisponibility] = useState<DisponibilityState>({
    recurrent: false,
    dispos: [],
  })

  useEffect(() => {
    async function fetchData() {
      const res = await getClient().get(`disponibilite/expert/${id}`)
      const filteredDispos = filterTimeslots(res?.data)
      setDisponibility(filteredDispos)
    }
    fetchData()
  }, [])
  function filterTimeslots(date) {
    if (date.repos) return null
    if (!date.recurrent) {
      date.dispos = date.dispos.filter(d => !isOlderThanToday(d.date))
      return date
    } else if (date.recurrent) {
      return date
    }
  }
  function isOlderThanToday(isoTimestamp) {
    const timestampDate = new Date(Date.parse(isoTimestamp))
    //get the timestamps of now
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return timestampDate < today
  }
  function getDaysSinceTimestamp(element): any {
    const timestampDate = new Date(Date.parse(element?.date))
    const today = new Date()
    const oneDay = 1000 * 60 * 60 * 24 // number of milliseconds in one day
    const diffTime = timestampDate.getTime() - today.getTime()
    const diffDays = Math.round(diffTime / oneDay)
    if (disponibility?.recurrent) {
      const timeslots: Timeslot[] = []
      if (diffDays < 0)
        for (let i = 1; i < 5; i++) {
          const id = i * 7 + diffDays
          timeslots.push({
            id: id,
            startHour: element.startHour,
            endHour: element.endHour,
          })
        }
      else
        for (let i = 0; i < 5; i++) {
          const id = i * 7 + diffDays
          timeslots.push({
            id: id,
            startHour: element.startHour,
            endHour: element.endHour,
          })
        }
      return timeslots
    }
    return diffDays
  }
  const availableTimeslots = disponibility?.dispos.flatMap(element => {
    if (!disponibility.recurrent) {
      return {
        id: getDaysSinceTimestamp(element),
        startTime: new Date(
          new Date(
            new Date().setDate(
              new Date().getDate() + Number(getDaysSinceTimestamp(element))
            )
          ).setHours(+element.startHour, 0, 0, 0)
        ),
        endTime: new Date(
          new Date(
            new Date().setDate(
              new Date().getDate() + Number(getDaysSinceTimestamp(element))
            )
          ).setHours(+element.endHour, 0, 0, 0)
        ),
      }
    } else {
      return getDaysSinceTimestamp(element)?.map(day => ({
        id: day.id,
        startTime: new Date(
          new Date(new Date().setDate(new Date().getDate() + day.id)).setHours(
            day.startHour,
            0,
            0,
            0
          )
        ),
        endTime: new Date(
          new Date(new Date().setDate(new Date().getDate() + day.id)).setHours(
            day.endHour,
            0,
            0,
            0
          )
        ),
      }))
    }
  })
  const typeCar = useMemo(() => {
    const md = model ? model : ''
    const mk = mark ? mark : ''
    return `${md} ${mk}`
  }, [model, mark])
  const handleSubmit = data => {
    createReservation({
      ...data,
      date: reservationTime,
      typeCar,
    })
    form.reset()
    closeModal()
  }
  const [errors, setErrors] = useState<string[]>([])

  return (
    <Formiz connect={form} onValidSubmit={handleSubmit}>
      <form noValidate onSubmit={form.submit} className="p-4 grid gap-4">
        <div>
          <div className="font-semibold text-xs mb-2 uppercase">
            Nom Complet
          </div>
          <Input
            type="text"
            name="fullName"
            placeholder="Votre nom et prénom"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
            }}
            className="border !border-[#C4CDD5] w-full !p-3 !text-black  !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900"
            validations={[validators.required, validators.minLength(3), validators.pattern(/^[A-Za-z\s]*$/), validators.notJustSpaces]}
          />
        </div>
        <div>
          <div className="font-semibold text-xs mb-2 uppercase">
            Numero de telephone
          </div>
          <Input
            type="tel"
            name="phone"
            placeholder="Votre numéro de téléphone"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
            }}
            className="border !border-[#C4CDD5] w-full !p-3 !text-black  !rounded-md focus:!outline-none focus:!bg-white focus:!text-gray-900"
            validations={[
              validators.required,
              validators.pattern(/^\d+$/),
              validators.length(8),
            ]}
          />
        </div>
        <Button
          onClick={() => setOpenModal(true)}
          type="primary"
          shape="default"
          icon={<CalendarOutlined />}
          size={'middle'}
        >
          Pick a date
        </Button>
        <Modal
          className={''}
          onClose={() => setOpenModal(false)}
          open={openModal}
          children={
            <div className='flex flex-col	'>
              <div className="font-semibold text-xs mb-2 uppercase ml-5  text-orange-50">
                SÉLECTIONNER une DATE
              </div>
              <ScheduleMeeting
                startTimeListStyle="scroll-list"
                borderRadius={10}
                primaryColor="#3f5b85"
                eventDurationInMinutes={30}
                availableTimeslots={availableTimeslots}
                selectedStartTime={reservationTime}
                onStartTimeSelect={e => {
                  setReservationTime(e.startTime)
                }}
                locale={fr}
              />{' '}
              <div className="font-semibold text-md mb-2 uppercase flex justify-end text-orange-50 mr-5">
                <button className="hover:text-indigo-900" onClick={()=> setOpenModal(false)}>VALIDER</button>
              </div>
            </div>
          }
        ></Modal>
        <div>
          <div className="font-bold text-xs mb-2 uppercase">
            MARQUE ET MODELE DE VOITURE
          </div>
          <MarksPicker
            id={id}
            className="flex flex-col space-y-2"
            onChange={e => {
              const { mark, model } = e
              if (mark) {
                setMark(mark.label)
              }
              if (model) {
                setModel(model.label)
              }
            }}
          />
        </div>
        <div>
          <div className="font-semibold text-xs mb-2 uppercase">
            Choisir le type de diagnostic
          </div>
          <Input
            type="radio"
            name="reason"
            placeholder="Choisir le type de diagnostic"
            validations={[validators.required]}
            options={[
              {
                key: "Diagnostic d'achat ou visite générale",
                label: "Diagnostic d'achat ou visite générale",
              },
              {
                key: 'Diagnostic de vente et certification',
                label: 'Diagnostic de vente et certification',
              },
            ]}
          />
        </div>
        <div className="text-red-500">{errors?.map(e => e)}</div>
        <button
          className="button w-full"
          type="submit"
          disabled={(!form.isValid && form.isSubmitted) || state.loading}
        >
          Demander un rendez-vous
        </button>
      </form>
    </Formiz>
  )
}
export default Reserve
// import { useParams } from 'react-router-dom'
// import If from 'app/shared/components/If'
// const ResetPassword = () => {
//   const form = useForm()
//   const handleSubmit = data => {
//     form.reset()
//   }
//   return (
//     <div className="py-40">
//       <div className="col-span-2 bg-white  rounded-sm pb-10">
//         <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
//           Réinitialiser mon mot de passe
//         </div>
//         <div className="grid gap-y-4 divide-y">
//           <Formiz connect={form} onValidSubmit={handleSubmit}>
//             <form
//               noValidate
//               onSubmit={form.submit}
//               className="p-4 md:p-10 grid gap-4"
//             >
//               <If test={done}>
//                 <div className="text-center">
//                   Votre mot de passe a été réinitialisé avec succès.
//                 </div>
//               </If>
//
//               <div>
//                 <Input
//                   type="password"
//                   name="password"
//                   placeholder="Nouveau Mot de passe"
//                   className="rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
//                   validations={[validators.required]}
//                 />
//               </div>
//
//             </form>
//           </Formiz>
//         </div>
//       </div>
//     </div>
//   )
// }
