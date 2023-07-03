import { Autocomplete } from '@react-google-maps/api'
import { useState } from 'react'

type TAutoComplete = google.maps.places.Autocomplete

type Props = {
  children: JSX.Element
  onChange: (address: string, lat: number, lng: number) => void
  className?: string
}

const CustomAutoComplete = ({ children, onChange, className }: Props) => {
  const [autocomplete, setAutocomplete] = useState<TAutoComplete | null>(null)

  const onLoad = (_autocomplete: TAutoComplete) => {
    setAutocomplete(_autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const location = autocomplete.getPlace().geometry?.location
      if (location)
        onChange(
          autocomplete.getPlace().formatted_address || '',
          location.lat(),
          location.lng()
        )
    }
  }

  return (
    <Autocomplete
      className={className}
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
    >
      {children}
    </Autocomplete>
  )
}

export default CustomAutoComplete
