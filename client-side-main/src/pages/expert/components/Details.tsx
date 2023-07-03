import Rating from 'app/shared/components/Rating'
import { useGetExpert } from 'app/store/hooks'
import { FaUserAlt } from 'react-icons/fa'
import { Spinner } from 'app/shared/components/Loading'

const Details = props => {
  const state = useGetExpert()

  if (state.loading || !state.data) {
    return (
      <div className="col-span-2 grid place-content-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="col-span-2 bg-white  rounded-sm pb-10">
      <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
        Profile de l'expert
      </div>

      <div className="grid gap-y-4">
        <div className="w-full p-6 xl:p-10 grid md:flex space-x-0 space-y-4 md:space-x-4 md:space-y-0 items-center col-span-2">
          <div className="grid place-content-center">
            <img
              src={
                state.data.profile
                  ? state.data.profile
                  : '/img/default-profile.svg'
              }
              alt="profile"
              className="max-h-96"
            />
          </div>
          <div className="w-full grid content-center pr-10">
            <div className="w-full flex flex-col ">
              <h1 className="text-xl">{state.data.fullName}</h1>

              <div className="grid space-y-2">
                <span>
                  Note {props.reviews.avg} sur 5 ({props.reviews.total} votes)
                </span>
                <Rating
                  value={Math.round(props.reviews.avg)}
                  className="w-5 h-5"
                />
              </div>

              <div>
                <h2 className="font-bold">ADRESSE</h2>
                <h3>{state.data.address}</h3>
              </div>

              <div className="bg-gray-100 w-48 h-10 text flex items-center rounded-full">
                <span className="rounded-full bg-primary h-full px-6 text-white grid place-content-center">
                  {state.data.nb_missions}
                </span>
                <span className="w-full grid place-content-center font-medium">
                  TOTAL CLIENTS
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 xl:px-10 grid md:flex space-x-0 space-y-4 md:space-x-4 md:space-y-0 col-span-2">
          <BioIcon />

          <div className="w-full">
            <h2>Declaration Professionnelle</h2>
            {state.data.propos?.split('\n').map((line, idx) => (
              <p key={idx}>
                {line}
                <br />
              </p>
            ))}
          </div>
        </div>

        <div className="px-6 xl:px-10 grid md:flex space-x-0 space-y-4 md:space-x-4 md:space-y-0 col-span-2">
          <CertificationIcon />

          <div className="w-full">
            <h2>Certifications</h2>
            <ul className="px-5">
              {state.data.certif?.map(certif => (
                <li className="list-disc" key={certif}>
                  {certif}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  isAuthenticated: boolean
}
export default Details

const BioIcon = () => (
  <div className="w-10 h-10 rounded-full grid place-content-center bg-primary">
    <FaUserAlt color="white" />
  </div>
)

const CertificationIcon = () => (
  <div className="w-10 h-10 rounded-full grid place-content-center bg-primary text-white fill-white">
    <svg
      stroke="white"
      fill="none"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeWidth="2"
        d="M15 19H2V1h16v4m0 0a5 5 0 110 10 5 5 0 010-10zm-3 9v8l3-2 3 2v-8M5 8h6m-6 3h5m-5 3h2M5 5h2"
      ></path>
    </svg>
  </div>
)
