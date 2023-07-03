import If from 'app/shared/components/If'
import { AiOutlineDownload as DownloadIcon } from 'react-icons/ai'
import { ImEye as EyeIcon } from 'react-icons/im'
import { IoTime as Time } from 'react-icons/io5'
import { FiUser as Avatar } from 'react-icons/fi'
import moment from 'moment'
import Reclamation from './Reclamation'

const Card = ({ status, id, expert, date, comment, link }) => {
  const handleDownload = async () => {
    const response = await fetch(link)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Rapport de diagnostic'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const windowName = 'Rapport de diagnostic'
  const windowFeatures =
    'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=600,height=400,top=100,left=100'

  const viewPdf = () => {
    window.open(link, windowName, windowFeatures)
  }

  return (
    <div className="flex md:items-center p-2 justify-between flex-col md:flex-row ">
      <User
        fullName={expert.fullName}
        date={date}
        commentaire={comment}
        image={expert.img}
      />
      <div className="ml-auto grid  gap-3 w-full xs:w-auto">
        <If test={status === 'ACCEPTEE'}>
          <div
            className="uppercase flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-[#F49342] text-white text-xs font-roboto"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <Time className="text-xl" />
            <span>Rapport Encours</span>
          </div>
        </If>

        <If test={status === 'COMPLETEE'}>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white text-xs font-roboto"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <DownloadIcon className="text-xl" />
            <span>TELECHARGER</span>
          </button>

          <button
            onClick={viewPdf} // call the handleOpenPdfViewer function when clicked
            className="uppercase flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white text-xs font-roboto"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <EyeIcon className="text-xl" />
            <span>Voir rapport</span>
          </button>

          <Reclamation reservationId={id} expertId={expert._id} />
        </If>
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
