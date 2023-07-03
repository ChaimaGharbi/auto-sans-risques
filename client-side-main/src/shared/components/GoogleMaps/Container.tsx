import { LoadScript, useLoadScript } from '@react-google-maps/api'
import { useRef } from 'react'

import { GoogleMap, HeatmapLayer, useJsApiLoader } from '@react-google-maps/api'
import Loading from '../Loading'

const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places', 'drawing', 'geometry']

const GoogleMapsContainer = ({ children }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY?.toString() || '',
    libraries,
  })

  // TODO: RETURN THIS BACK
  // if (!isLoaded) return <Loading />
  return children

  // const libraries = useRef<
  //   ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[]
  // >(['places', 'drawing', 'geometry'])
  // return (
  //   <LoadScript
  //     googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY?.toString() || ''}
  //     libraries={libraries.current}
  //   >
  //     {children}
  //   </LoadScript>
  // )
}

export default GoogleMapsContainer
