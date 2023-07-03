import If from 'app/shared/components/If'
import { Link } from 'react-router-dom'
import { FiUser as Avatar } from 'react-icons/fi'
import moment from 'moment'

const Card = ({ comment, date, client, report, id }) => {
  return (
    <div className="flex md:items-center p-2 justify-between flex-col md:flex-row ">
      <User
        fullName={client.fullName}
        date={date}
        commentaire={comment}
        image={client.img}
      />
      <div className="ml-auto grid w-full xs:w-auto">
        <Link to={`/ongoing/${id}`}>
          <a
            className="text-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white font-black font-roboto hover:text-white block"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            REMPLIR RAPPORT
          </a>
        </Link>
      </div>
    </div>
  )
}

const User = props => {
  const { image, commentaire, fullName, date } = props

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
export default Card
