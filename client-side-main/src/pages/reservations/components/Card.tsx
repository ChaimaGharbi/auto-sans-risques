import If from 'app/shared/components/If'
import { Link } from 'react-router-dom'
import { HiOutlineCheck as Done, HiOutlineX as X } from 'react-icons/hi'
import { IoTime as Time } from 'react-icons/io5'
import { FiUser as Avatar } from 'react-icons/fi'
import moment from 'moment-with-locales-es6'
const Card = ({ status, id, comment, date, expert }) => {
  return (
    <div className="flex md:items-center p-2 justify-between flex-col md:flex-row ">
      <User
        fullName={expert.fullName}
        date={date}
        commentaire={comment}
        image={expert.img}
      />
      <div className="ml-auto flex flex-wrap items-center justify-end gap-3 w-full xs:w-auto">
        <If test={status === 'COMPLETEE'}>
          <div
            className="uppercase flex items-center justify-center space-x-3 text-center w-full xs:w-56 py-3 rounded-lg bg-[#05fe54] text-white text-xs font-rubik hover:text-white"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <Done className="text-xl" />
            <span>Completée</span>
          </div>
        </If>
        <If test={status === 'ACCEPTEE'}>
          <div
            className="uppercase flex items-center justify-center space-x-3 text-center w-full xs:w-56 py-3 rounded-lg bg-[#48E03B] text-white text-xs font-rubik hover:text-white"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <Done className="text-xl" />
            <span>Acceptée</span>
          </div>
        </If>
        <If test={status === 'REFUSEE'}>
          <div
            className="uppercase flex items-center justify-center space-x-3 text-center w-full xs:w-56 py-3 rounded-lg bg-[#FF6D64] text-white text-xs font-rubik hover:text-white"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <X className="text-xl" />
            <span>Indisponible</span>
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

        <If test={status === 'EN_COURS'}>
          <div
            className="uppercase flex items-center justify-center space-x-3 text-center w-full xs:w-56 py-3 rounded-lg bg-[#F49342] text-white text-xs font-rubik hover:text-white"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <Time className="text-xl" />
            <span>En cours</span>
          </div>
        </If>

        <If test={status === 'ANNULEE'}>
          <div
            className="uppercase flex items-center justify-center space-x-3 text-center w-full xs:w-56 py-3 rounded-lg bg-[#FF6D64] text-white text-xs font-rubik hover:text-white"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <Time className="text-xl" />
            <span>Annulée</span>
          </div>
        </If>
      </div>
    </div>
  )
}

const User = props => {
  const { image, commentaire, fullName, date } = props
  console.log(props)
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
          <h1 className="font-medium m-0 font-rubik">{fullName}</h1>
          <span className="text-[#47495A] uppercase font-rubik">
            {moment(date).locale('fr').format('DD MMMM YYYY - HH:mm')}
          </span>
        </div>
      </div>

      <p className="font-medium font-rubik text-[#212B36]">{commentaire}</p>
    </div>
  )
}
export default Card
