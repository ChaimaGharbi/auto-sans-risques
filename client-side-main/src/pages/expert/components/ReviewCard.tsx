import { Formiz, useForm } from '@formiz/core'
import If from 'app/shared/components/If'
import Input from 'app/shared/components/Register/Input'
import { useState } from 'react'
import { getClient } from 'app/store/api'
import { useGetUser } from 'app/store/hooks'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from 'app/store/experts'
import { Button } from 'antd'
import { isMinLength, isPattern, isRequired } from '@formiz/validations'

const ReviewCard = () => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const [rate, setRate] = useState(0)
  const [current, setCurrent] = useState(0)

  const handleClick = value => {
    setRate(value)
    setCurrent(value)
    //onChange(value)
  }

  const handleMouseEnter = value => {
    setCurrent(value)
  }

  const onMouseLeave = () => {
    setCurrent(rate)
  }
  const myForm = useForm()
  const { me } = useGetUser()
  const dp = useDispatch()

  const submitForm = async values => {
    setLoading(true)
    const res = await getClient().post('/avis', {
      note: rate,
      commentaire: values.commentaire,
      expertId: id,
      clientId: me?.data?._id,
    })
    console.log(res.data)

    dp(actions.addReview(res.data))
    setLoading(false)
    setOpenModal(false)
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="min-h-[3rem] shadow-xl bg-primary text-white text-sm block hover:text-white rounded-md font-medium p-2 sm:py-2 sm:px-4 w-full sm:w-[unset]"
      >
        Ajoutez un commentaire
      </button>
      <Formiz onValidSubmit={submitForm} connect={myForm}>
        <form
          noValidate
          onSubmit={myForm.submit}
          className="demo-form"
          //style={{ minHeight: '16rem' }}
        >
          <If test={openModal}>
            <div
              className="fixed inset-0 bg-black/80 z-[2002]"
              onClick={handleCloseModal}
            />
            <div className="rounded-md  fixed w-[80%] md:w-1/2 !top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2003] bg-white">
              <div className="grid gap-y-2 p-4 md:p-10">
                <img
                  src="/top-star.svg"
                  alt="top star"
                  className="w-14 mx-auto"
                />
                <p className="font-rubik text-center">
                  Pour accéder à votre rapport, merci d'attribuer une note sur
                  la mission
                </p>
                <div className="flex items-center justify-center ">
                  {new Array(5).fill(0).map((_, index) => (
                    <button
                      onClick={() => handleClick(index + 1)}
                      onMouseEnter={() => handleMouseEnter(index + 1)}
                      onMouseLeave={onMouseLeave}
                      key={index}
                      className={`${
                        index < current ? 'text-[#FF9529]' : 'text-[#C8C8C8]'
                      } text-6xl sm:text-8xl m-0 relative -left-2 duration-300`}
                    >
                      ⭑
                    </button>
                  ))}
                </div>
                <Input
                  required
                  className="relative h-20 resize-none rounded bg-[#F0F0F0] w-full p-4 text-sm placeholder-[#BFBFBF] focus:outline-none"
                  placeholder="Votre Commentaire.."
                  name="commentaire"
                  validations={[
                    {
                      rule: isMinLength(8),
                      message:
                        'Ce champs doit au minimum contenir 8 caracteres',
                    },
                    {
                      rule: isRequired(),
                      message: 'Ce champs est obligatoire!',
                    },
                  ]}
                  type="textarea"
                ></Input>
                <div className="grid sm:grid-cols-2 gap-4 ">
                  <button
                    onClick={handleCloseModal}
                    className="button bg-[#F0F0F0] text-black shadow-none hover:text-black"
                  >
                    Annuler
                  </button>
                  <button type="submit">
                    <Button
                      loading={loading}
                      className="button w-full"
                      type="primary"
                    >
                      Ajouter
                    </Button>
                  </button>
                </div>
              </div>
            </div>
          </If>
        </form>
      </Formiz>
    </>
  )
}

export default ReviewCard

// function StarRater({ onChange }) {
//   const [rate, setRate] = useState(0)
//   const [current, setCurrent] = useState(0)

//   const handleClick = value => {
//     setRate(value)
//     setCurrent(value)
//     onChange(value)
//   }

//   const handleMouseEnter = value => {
//     setCurrent(value)
//   }

//   const onMouseLeave = () => {
//     setCurrent(rate)
//   }
//   return (
//     <div className="flex items-center justify-center ">
//       {new Array(5).fill(0).map((_, index) => (
//         <button
//           onClick={() => handleClick(index + 1)}
//           onMouseEnter={() => handleMouseEnter(index + 1)}
//           onMouseLeave={onMouseLeave}
//           key={index}
//           className={`${
//             index < current ? 'text-[#FF9529]' : 'text-[#C8C8C8]'
//           } text-8xl m-0  relative -left-2 duration-300`}
//         >
//           ⭑
//         </button>
//       ))}
//     </div>
//   )
// }

// function UnratedStar() {
//   return (
//     <span
//       className={`text-[#C8C8C8] text-6xl m-0 leading-4 tracking-tighter relative -left-2`}
//     >
//       ⭑
//     </span>
//   )
// }

// function RatedStar() {
//   return (
//     <span
//       className={`text-[#FF9529] text-6xl m-0 leading-4 tracking-tighter relative -left-2`}
//     >
//       ⭑
//     </span>
//   )
// }
