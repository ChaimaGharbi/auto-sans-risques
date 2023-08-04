import {AiOutlineDownload as DownloadIcon, AiOutlineLoading as LoadingIcon} from 'react-icons/ai'
import {ImEye as EyeIcon} from 'react-icons/im'
import If from 'app/shared/components/If'
import {FiUser as Avatar} from 'react-icons/fi'
import moment from 'moment-with-locales-es6'
import {useState} from "react";
import {getClient} from "app/store/api";

const Card = ({link, comment, date, client, report}) => {

    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState("")
    const handleLoad = async () => {
        try {
            setLoading(true)
            const pdf = await getClient()
                .get(`/rapport/pdf/${report}`, {responseType: 'arraybuffer'})
            const blob = new Blob([pdf.data], {type: 'application/pdf'});
            const url = URL.createObjectURL(blob);
            setUrl(url)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Rapport.pdf'); // Change the filename if needed
        document.body.appendChild(link);
        link.click();
    };
    const windowName = 'Rapport de diagnostic'
    const windowFeatures =
        'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=1000,height=800,top=100,left=400'
    const viewPdf = () => {
        window.open(url, windowName, windowFeatures)
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

                {
                    url !== "" ?
                        <>
                            <button
                                onClick={handleDownload}
                                className="flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white hover:text-white font-roboto"
                                style={{
                                    boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
                                }}
                            >
                                <DownloadIcon className="text-xl"/>
                                <span>TELECHARGER</span>
                            </button>
                            <button
                                onClick={viewPdf}
                                className="uppercase flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white hover:text-white font-roboto"
                                style={{
                                    boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
                                }}
                            >
                                <EyeIcon className="text-xl"/>
                                <span>Voir rapport</span>
                            </button>
                        </>
                        : <button
                            disabled={loading}
                            onClick={handleLoad}
                            className="flex items-center space-x-3 justify-center w-full xs:w-56 py-3 rounded-lg bg-primary text-white hover:text-white font-roboto"
                            style={{
                                boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
                            }}
                        >
                            {
                                loading ? <LoadingIcon className="text-xl animate-spin"/> : null
                            }
                            <span>CHARGER RAPPORT</span>
                        </button>
                }
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
          <h1 className="font-medium m-0 font-roboto">{fullName}</h1>
          <span className="text-[#47495A] uppercase font-roboto">
            {moment(date).locale('fr').format('DD MMMM YYYY - HH:mm')}
          </span>
        </div>
      </div>
      <p className="font-medium font-roboto text-[#212B36]">{commentaire}</p>
    </div>
  )
}
