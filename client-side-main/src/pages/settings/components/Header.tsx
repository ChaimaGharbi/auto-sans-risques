import { MdModeEditOutline } from 'react-icons/md'
import { AiFillInfoCircle } from 'react-icons/ai'
import { useGetUser, useUpdateToUpload } from 'app/store/hooks'
import If from 'app/shared/components/If'
import toast from 'react-hot-toast'

export default function Header() {
  const { me } = useGetUser()

  const { loading, upload } = useUpdateToUpload()

  function submitImage(e) {
    const file = e.target.files[0]

    // check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Le fichier doit être une image')
      return
    }

    const formData = new FormData()
    formData.append('img', file)
    upload(me.data?.role.toLowerCase(), formData)
  }

  console.log(me.data)

  return (
    <div className="flex flex-col-reverse  lg:grid lg:grid-cols-3 p-4">
      <div></div>
      <div className="grid justify-items-center space-y-3">
        <img
          className="w-52 h-52 rounded-md"
          src={
            me.data?.img
              ? me.data?.img
              : `https://avatars.dicebear.com/api/initials/${me.data?.fullName
                  .split(' ')
                  .join('-')}.svg`
          }
          alt="profile"
        />
        <label
          onChange={submitImage}
          className="cursor-pointer hover:text-white w-52 bg-primary text-white font-semibold flex items-center justify-center space-x-2 py-2 rounded-md"
        >
          <input
            disabled={loading}
            type="file"
            name="img"
            className="hidden"
            accept="image/*"
          />
          <MdModeEditOutline className="text-lg" />
          <span>{loading ? 'Téléchargement..' : 'Choisir Image'}</span>
        </label>
      </div>

      <If test={me.data && !me.data.isVerified}>
        <div className="py-4 w-full grid place-content-center content-center lg:place-content-end lg:content-start">
          <button
            className="uppercase flex items-center space-x-3 justify-center w-52  py-3 rounded-lg bg-[#F49342] text-white text-xs font-rubik"
            style={{
              boxShadow: '0px 7px 34px rgba(78, 173, 255, 0.3)',
            }}
          >
            <AiFillInfoCircle className="text-xl" />
            <span>En attente de validation</span>
          </button>
        </div>
      </If>
    </div>
  )
}
