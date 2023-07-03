import { GoogleMap, Marker } from '@react-google-maps/api'

import Container from 'app/shared/components/Container'

import {
  FaFacebook as Facebook,
  FaLinkedin as LinkedIn,
  FaPhone as Phone,
  FaInstagram as Instagram,
  FaYoutube as Youtube,
} from 'react-icons/fa'

import { IoLocationSharp as Location } from 'react-icons/io5'

const OurLocation = () => {
  return (
    <Container>
      <div className="font-roboto grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 flex flex-col space-y-5">
          <div className="font-bold text-2xl">Siège social</div>
          <div className="flex items-center space-x-4">
            <span>{<Location className="h-6 w-6" />}</span>
            <div className="text-lg text-gray-900">
              Immeuble Astra, rue du Lac Victoria Les Berges du Lac 1 - 1053
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>{<Phone className="h-5 w-5" />}</span>
            <div className="text-lg text-gray-900">+216 98 343 361</div>
          </div>
          <div className="h-10"></div>
          <div className="">
            <div className="text-lg pb-4  text-gray-900">
              Suivez-nous sur les médias sociaux pour rester au courant de nos
              dernières nouvelles{' '}
            </div>
            <div className="flex space-x-4">
            <a
                href="https://www.facebook.com/AutoSansRisque"
                target="_blank"
            >
              <Facebook fontSize={25} color="#000000" /></a>
              <a
                  href="https://www.instagram.com/autosansrisque/"
                  target="_blank"
                >
              <Instagram fontSize={25} color="#000000" /></a>
              <Youtube fontSize={25} color="#000000" />
              <a
                  href="https://www.linkedin.com/company/auto-sans-risque/about/"
                  target="_blank"
                >
              <LinkedIn fontSize={25} color="#000000" /></a>
            </div>
          </div>
        </div>
        <div className="">
          <div id="mapid" className="md:h-96 h-96  bg-blue-200">
            <GoogleMap
              center={center}
              zoom={14}
              mapContainerStyle={{
                height: '100%',
                width: '100%',
              }}
            >
              <Marker position={center} />
            </GoogleMap>
          </div>
        </div>
      </div>
    </Container>
  )
}

const center = {
  lat: 36.844,
  lng: 10.1953,
}
const renderMarkers = (map, maps) => {
  const marker = new maps.Marker({
    position: { lat: 36.8443237, lng: 10.1953663 },
    map,
    title: 'Hello World!',
  })
  return marker
}

export default OurLocation
