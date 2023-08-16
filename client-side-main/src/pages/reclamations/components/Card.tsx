import If from 'app/shared/components/If'
import { Link } from 'react-router-dom'
import { IoTimerOutline as Icon } from 'react-icons/io5'
import moment from 'moment-with-locales-es6'
import { IoTime as Time } from 'react-icons/io5'

const Card = ({ status, title, date, id }) => {
  return (
    <div className="flex md:items-center space-y-4 md:space-y-0 py-5 justify-between flex-col md:flex-row ">
      <div className="grid ">
        <h1 className="font-medium m-0 font-rubik">Sujet : {title}</h1>
        <span className="text-[#47495A] uppercase font-rubik">
          {moment(date).locale('fr').format('DD MMMM YYYY - HH:mm')}
        </span>
      </div>

      <div className="ml-auto flex flex-wrap items-center justify-end gap-3 w-full xs:w-auto">
        <If test={status === 'RESOLU'}>
          <div
            className="text-xs text-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white uppercase font-rubik hover:text-white block"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            Reclamation reçu
          </div>
        </If>
        <If test={status === 'EN_COURS'}>
          <div
            className="text-xs flex items-center space-x-3 text-center w-full xs:w-56 py-3 rounded-lg bg-[#F49342] text-white uppercase font-rubik hover:text-white justify-center"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <Icon className="text-xl" />
            <span>Encours de traitement</span>
          </div>
        </If>
        <If test={status === 'EN_ATTENTE'}>
          <div
            className="uppercase flex items-center justify-center space-x-3 text-center w-full xs:w-56 py-3 rounded-lg bg-[#F49342] text-white text-xs font-rubik hover:text-white"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <Time className="text-xl" />
            <span>En attente</span>
          </div>
        </If>
      </div>
    </div>
  )
}

const User = props => {
  const { image, commentaire, fullName } = props

  return (
    <div className="grid py-2">
      <div className="flex items-center gap-x-4 py-2 ">
        <img
          className="rounded-full w-14 h-14"
          src={image ? image : '/img/default-profile.svg'}
          alt="profile"
        />
        <div className="grid ">
          <h1 className="font-medium m-0 font-rubik">{fullName}</h1>
          <span className="text-[#47495A] uppercase font-rubik">
            14 SEPTEMBRE 2020 - 09:30
          </span>
        </div>
      </div>

      <p className="font-medium font-rubik text-[#212B36]">{commentaire}</p>
    </div>
  )
}
export default Card
