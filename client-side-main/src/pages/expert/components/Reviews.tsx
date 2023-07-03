import moment from 'moment'
import Rating from 'app/shared/components/Rating'
import { Spinner } from 'app/shared/components/Loading'
import If from 'app/shared/components/If'
import { useState } from 'react'
import { useGetUser, useGetReviews, useMoreReviews } from 'app/store/hooks'
import ReviewCard from './ReviewCard'

const Reviews = () => {
  const { role } = useGetUser()
  const state = useGetReviews()
  const getMoreReviews = useMoreReviews()

  if (state.loading || !state.data)
    return (
      <div className="col-span-2 grid place-content-center">
        <Spinner />
      </div>
    )

  return (
    <div className="bg-white col-span-2 border-t p-4 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 py-4">
        <h1 className="uppercase text-xl text-slate-500">
          Commentaires ({state.total})
        </h1>

        <div className="flex items-center justify-end">
          <If test={role === 'CLIENT'}>
            <ReviewCard />
          </If>
        </div>
      </div>

      <div className="divide-y">
        {state.data.map(review => (
          <Review key={review._id} {...review} />
        ))}

        <If test={state.total === 0}>
          <div className="py-10 text-center text-gray-400">Aucun feedback</div>
        </If>
        <If test={state.data.length < state.total}>
          <button
            onClick={getMoreReviews}
            className="shadow-xl bg-primary text-white text-sm block hover:text-white  rounded-md font-medium w-full py-2"
          >
            Voir plus
          </button>
        </If>
      </div>
    </div>
  )
}

const Review = props => {
  const [image, setImage] = useState({
    isOpened: false,
    src: '',
  })

  const handleOpenImage = src => {
    setImage({ isOpened: true, src })
  }

  const handleCloseImage = () => {
    setImage({ isOpened: false, src: '' })
  }

  return (
    <>
      <If test={image.isOpened === true}>
        <div
          className="fixed inset-0 bg-black/80 z-[2002]"
          onClick={handleCloseImage}
        />

        <button
          onClick={handleCloseImage}
          className="bg-red-500 p-2 rounded-full border-none text-white fixed top-[20%] right-4 lg:right-20 z-[2004]"
        >
          <CloseIcon />
        </button>

        <img
          className="fixed w-[80%] md:w-[40%] z-[2003] !top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={image.src}
          alt="image"
        />
      </If>
      <div className="grid py-2">
        <div className="flex space-x-4 py-2 ">
          <img
            className="rounded-full w-10 h-10"
            src={
              props.clientId?.img
                ? props.clientId?.img
                : '/img/default-profile.svg'
            }
            alt="profile"
          />

          <div className="grid gap-y-1">
            <h1 className="font-medium m-0">{props.clientId?.fullName}</h1>
            <Rating value={props.note} />
          </div>
        </div>

        <h3 className="py-2 m-0">
          Note le {moment(props.date).format('mm MMMM YYYY')}
        </h3>

        <p>{props.commentaire}</p>

        <div>
          {props.images?.map(({ imageUrl, _id }) => (
            <button
              key={_id}
              onClick={() => {
                handleOpenImage(imageUrl)
              }}
            >
              <img src={imageUrl} alt="profile" className="w-20" />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
export default Reviews

const CloseIcon = () => (
  <svg
    className="w-5"
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M195.2 195.2C207.202 183.202 223.477 176.462 240.448 176.462C257.419 176.462 273.694 183.202 285.696 195.2L512 421.504L738.304 195.2C750.375 183.542 766.541 177.091 783.322 177.237C800.102 177.383 816.154 184.113 828.02 195.98C839.887 207.846 846.617 223.898 846.763 240.678C846.909 257.459 840.458 273.625 828.8 285.696L602.496 512L828.8 738.304C840.458 750.375 846.909 766.541 846.763 783.322C846.617 800.102 839.887 816.154 828.02 828.02C816.154 839.887 800.102 846.617 783.322 846.763C766.541 846.909 750.375 840.458 738.304 828.8L512 602.496L285.696 828.8C273.625 840.458 257.459 846.909 240.678 846.763C223.898 846.617 207.846 839.887 195.98 828.02C184.113 816.154 177.383 800.102 177.237 783.322C177.091 766.541 183.542 750.375 195.2 738.304L421.504 512L195.2 285.696C183.202 273.694 176.462 257.419 176.462 240.448C176.462 223.477 183.202 207.202 195.2 195.2V195.2Z"
      fill="white"
    />
  </svg>
)
