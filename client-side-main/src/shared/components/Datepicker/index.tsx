import {DatePicker} from 'react-rainbow-components'
import { useState } from 'react'

interface Props {
  className?: string
  onChange
  useClassName?: boolean
  value?: string
  // id: string
  // label: string
  placeholder?: string
  [key: string]: any
}
export default function Picker({
  className = '',
  onChange,
  useClassName,
  ...props
}: Props) {
  return (
    <DatePicker
    
    locale='fr'
      {...props}
      icon={<CalendarIcon />}
      className={`${
        useClassName
          ? 'dt-picker font-mulish w-full h-12 huge:h-20 !text-lg !text-black bg-white !rounded-md focus:outline-none focus:bg-white focus:text-gray-900 cursor-pointer grid content-center'
          : ''
      } ${className}`}
      value={props.value ? new Date(Number(props.value)) : undefined}
      onChange={v => {
        onChange(v)
      }}
    />
  )
}

export const CalendarIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600345 16.1053H16.3997C16.7364 16.1053 17 15.8351 17 15.4899V1.75612C17 1.4109 16.7364 1.14073 16.3997 1.14073H13.4272V0.615392C13.4272 0.270172 13.1637 0 12.8269 0C12.4901 0 12.2265 0.270172 12.2265 0.615392V1.14073H4.87597V0.615392C4.87597 0.270172 4.6124 0 4.27562 0C3.93885 0 3.67528 0.270172 3.67528 0.615392V1.14073H0.600345C0.263566 1.14073 0 1.4109 0 1.75612V15.5049C0 15.8351 0.278208 16.1053 0.600345 16.1053ZM1.20069 2.37151H3.67528V2.70172C3.67528 3.04694 3.93885 3.31711 4.27562 3.31711C4.6124 3.31711 4.87597 3.04694 4.87597 2.70172V2.37151H12.2265V2.70172C12.2265 3.04694 12.4901 3.31711 12.8269 3.31711C13.1637 3.31711 13.4272 3.04694 13.4272 2.70172V2.37151H15.814V3.96253H1.20069V2.37151ZM15.7993 5.19331H1.20069V14.8895H15.7993V5.19331Z"
      fill="black"
    />
    <path
      d="M12.8197 8.05261H4.17861C3.84175 8.05261 3.57812 8.24902 3.57812 8.49998C3.57812 8.75094 3.84175 8.94735 4.17861 8.94735H12.8197C13.1566 8.94735 13.4202 8.75094 13.4202 8.49998C13.4202 8.24902 13.1566 8.05261 12.8197 8.05261Z"
      fill="black"
    />
    <path
      d="M8.36271 10.7368H4.16196C3.83444 10.7368 3.57812 10.9332 3.57812 11.1842C3.57812 11.4351 3.83444 11.6316 4.16196 11.6316H8.36271C8.69023 11.6316 8.94655 11.4351 8.94655 11.1842C8.94655 10.9332 8.69023 10.7368 8.36271 10.7368Z"
      fill="black"
    />
  </svg>
)
