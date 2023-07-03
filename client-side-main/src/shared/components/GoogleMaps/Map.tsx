import { GoogleMap, Marker, DirectionsService } from '@react-google-maps/api'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// TODO: Directions
const Map = props => {
  const [openModal, setOpenModal] = useState(false)
  const [loadedModal, setLoadedModal] = useState({})

  return (
    <div className=" lg:w-full mx-auto h-full">
      <div className="relative w-full h-full">
        {openModal && (
          <>
            <Modal {...loadedModal} />
            <div
              onClick={() => setOpenModal(false)}
              className="left-0 top-0 w-full h-full absolute bg-black/70 z-40 duration-200"
              id="layer"
            >
              <button className="bg-red-500 p-2 rounded-full text-white absolute top-[20%] right-4 lg:right-20">
                <CloseIcon />
              </button>
            </div>
          </>
        )}
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 0,
          }}
          zoom={12}
          center={props.center}
        >
          {props.data.map((marker, idx) => (
            <Marker
              key={idx}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              icon="/marker.svg"
              onClick={() => {
                setOpenModal(true)
                setLoadedModal(props.data.find(item => item._id === marker._id))
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  )
}

export default Map

const Modal = props => {
  return (
    <div className="bg-white w-52  absolute z-50 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
      <div className="p-4">
        <img
          src={props.img}
          alt="Profile"
          className="w-40 h-44 mx-auto object-cover"
        />
        <div className="py-3">
          <h1 className="text-center">{props.fullName}</h1>
          <h3 className="text-[#6B7C93] text-xs text-center">
            {props.adresse}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <button className="grid place-content-center w-full py-2 text-white hover:text-white bg-[#4EADFF] hover:bg-[#007696] duration-200">
          Directions
        </button>
        <Link
          to={`/experts/${props._id}`}
          className="grid place-content-center w-full py-2 text-white hover:text-white bg-[#4EADFF] hover:bg-[#007696] duration-200"
        >
          Profile
        </Link>
      </div>
    </div>
  )
}

const CloseIcon = () => (
  <svg
    className="w-5"
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M195.2 195.2C207.202 183.202 223.477 176.462 240.448 176.462C257.419 176.462 273.694 183.202 285.696 195.2L512 421.504L738.304 195.2C750.375 183.542 766.541 177.091 783.322 177.237C800.102 177.383 816.154 184.113 828.02 195.98C839.887 207.846 846.617 223.898 846.763 240.678C846.909 257.459 840.458 273.625 828.8 285.696L602.496 512L828.8 738.304C840.458 750.375 846.909 766.541 846.763 783.322C846.617 800.102 839.887 816.154 828.02 828.02C816.154 839.887 800.102 846.617 783.322 846.763C766.541 846.909 750.375 840.458 738.304 828.8L512 602.496L285.696 828.8C273.625 840.458 257.459 846.909 240.678 846.763C223.898 846.617 207.846 839.887 195.98 828.02C184.113 816.154 177.383 800.102 177.237 783.322C177.091 766.541 183.542 750.375 195.2 738.304L421.504 512L195.2 285.696C183.202 273.694 176.462 257.419 176.462 240.448C176.462 223.477 183.202 207.202 195.2 195.2V195.2Z"
      fill="white"
    />
  </svg>
)
