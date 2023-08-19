import Rating from 'app/shared/components/Rating'
import {useGetUser} from 'app/store/hooks'
import {FaUserAlt} from 'react-icons/fa'
import {Spinner} from 'app/shared/components/Loading'
import If from 'app/shared/components/If'
import {MdModeEditOutline} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {CreditCardIcon} from './CC.icon'

const Details = props => {
  const state = useGetUser()

  if (state.me.loading || !state.me.data) {
    return (
      <div className="col-span-2 grid place-content-center">
        <Spinner />
      </div>
    )
  }
  console.log(state.me.data)

  return (
    <div className="col-span-2 bg-white  rounded-sm pb-10">
      <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
        Votre Profile
      </div>

      <div className="grid gap-y-4">
        <div className="col-span-2 w-full p-6 xl:p-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-0 space-y-4 md:space-x-4 md:space-y-0 items-center">
          <div className="grid place-content-center ">
            <img
              src={
                state.me.data.img
                  ? state.me.data.img
                  : '/img/default-profile.svg'
              }
              alt="profile"
              className="w-full h-56 lg:h-64 xl:h-80 bg-gray-300 object-cover"
            />
          </div>
          <div className="grid">
            <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 mb-2">
              <div>
                <h1 className="text-xl">{state.me.data.fullName}</h1>

                <div className="grid space-y-2">
                  <If test={state.role === 'EXPERT'}>
                    <span className="font-semibold">
                      Note {props.reviews.avg} sur 5 ({props.reviews.total}{' '}
                      votes)
                    </span>
                    <Rating
                      value={Math.round(props.reviews.avg)}
                      className="w-5 h-5"
                    />
                  </If>
                </div>
              </div>

              <div>
                <div>
                  <h2 className="font-bold">ADRESSE</h2>
                  <h3>{state.me.data.address}</h3>
                </div>

                <Link
                  to="/edit"
                  className="hover:text-white w-48 bg-primary text-white font-semibold flex items-center justify-center space-x-2 py-2 rounded-md"
                >
                  <MdModeEditOutline className="text-lg" />
                  <span>Modifier mon profil</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="font-rubik col-span-1 md:col-span-2 lg:col-span-1">
            <div
              className={` ${
                state.me.data.isVerified ? 'bg-[#0CD45C]' : 'bg-[#EC1313]'
              } rounded-full py-3 text-white text-center uppercase font-semibold`}
            >
              Votre Compte est{' '}
              {state.me.data.isVerified ? 'verifié' : 'non verifié'}
            </div>
            <div className="py-3 w-full flex items-center justify-between">
              <span className="uppercase px-3">CRédit missions</span>
              <span className="py-3 w-1/3 text-center font-semibold bg-[#0CD45C] rounded-full text-white ">
                {state.me.data.credit}
              </span>
            </div>
            <div className="py-3 w-full flex items-center justify-between">
              <span className="uppercase px-3">Total Clients</span>
              <span className="py-3 w-1/3 text-center font-semibold bg-primary rounded-full text-white ">
                {state.me.data.nb_missions}
              </span>
            </div>
            <Link
              to="/buy-credits"
              className="py-3 w-full flex items-center justify-between border rounded-full border-gray-400"
            >
              <span className="uppercase px-3 text-black text-xs">
                RECHARGER CRédit missions
              </span>
              <span className="px-3 font-semibold text-lgrounded-full ">
                <CreditCardIcon />
              </span>
            </Link>
          </div>
        </div>

        <If test={state.role === 'EXPERT'}>
          <div className="px-6 xl:px-10 grid md:flex space-x-0 space-y-4 md:space-x-4 md:space-y-0 col-span-2">
            <BioIcon />

            <div className="w-full">
              <h2>Declaration Professionnelle</h2>
              {state.me.data.propos?.split('\n').map((line, idx) => (
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
                {state.me.data.certif?.map(certif => (
                  <li className="list-disc" key={certif}>
                    {certif}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </If>
      </div>
    </div>
  )
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
