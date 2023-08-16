import { AiOutlineDownload as DownloadIcon } from 'react-icons/ai'
import { ImEye as EyeIcon } from 'react-icons/im'
import If from 'app/shared/components/If'
import { FiUser as Avatar } from 'react-icons/fi'
import moment from 'moment-with-locales-es6'
const Card = ({ link, comment, date, client, report }) => {
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
    'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=1000,height=800,top=100,left=400'
  const viewPdf = () => {
    window.open(link, windowName, windowFeatures)
  }
  return (
    <div className="flex md:items-center p-2 justify-between flex-col md:flex-row ">
      <User
        fullName={client.fullName}
        date={date}
        commentaire={comment}
        image={client.img}
      />
      <div className="ml-auto grid gap-3 w-full xs:w-auto">
        {link ? (
          <>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white hover:text-white font-rubik"
              style={{
                boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
              }}
            >
              <DownloadIcon className="text-xl" />
              <span>TELECHARGER</span>
            </button>
            <button
              onClick={viewPdf}
              className="uppercase flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white hover:text-white font-rubik"
              style={{
                boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
              }}
            >
              <EyeIcon className="text-xl" />
              <span>Voir rapport</span>
            </button>
          </>
        ) : (
          <span className="text-xs font-rubik capitalize">
            en cours de génération
          </span>
        )}
      </div>
    </div>
  )
}
export default Card
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
