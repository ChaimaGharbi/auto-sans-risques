import { Link } from 'react-router-dom'
import Rating from 'app/shared/components/Rating'

const Expert = (props: Props) => {
  return (
    <div
      className={`rounded p-4 w-full grid 2xl:flex items-center space-y-4 bg-white max-w-full h-auto `}
    >
      <div className="grid xxs:flex items-center space-x-4">
        <img
          alt="profil"
          src={props.img ? props.img : '/img/default-profile.svg'}
          className={`h-40 w-40 bg-gray-300  object-cover rounded mx-auto xxs:mx-0`}
        />

        <div className="leading-normal">
          <div className="flex flex-col justify-center text-center xxs:text-left">
            <div className="flex flex-col  space-y-1">
              <div className="text-[#47495A] font-bold text-xl mb-1">
                {props.name}
              </div>
              <div className="text-gray-400 leading-none mx-auto xxs:mx-0">
                <Rating value={props.note} />
              </div>
              <div className="text-dark-gray text-xs font-medium ">
                Noté {props.note ?? 0} sur 5
              </div>
              <div className="flex flex-col space-y-0">
                <p className="text-base font-medium text-gray-600 m-0 ">
                  LOCALISAION
                </p>
                <p className="text-sm font-medium text-dark-gray m-0">
                  {props.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full ml-auto mt-auto">
        <div className="h-full flex items-end justify-end w-full">
          <Link
            to={`/experts/${props.id}`}
            className="button grid place-content-center w-full 2xl:w-[14rem]"
          >
            Voir profile
          </Link>
        </div>
      </div>
    </div>
  )
}

type Props = {
  id: string
  name: string
  img: string
  speciality: any
  city: string
  address: string
  note: any
  height?: string
}

export default Expert
