import {
  useRecentNotifications,
  useNewNotifications,
  useClearNotification,
} from 'app/store/hooks'
import * as Dropdown from '../Dropdown'
import { Notification } from './Icons'
import Loading from '../Loading'
import If from '../If'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useUpdateAreRead } from 'app/store/hooks'

function link(msg, id) {
  if (msg.toLowerCase().includes('veuillez confirmer ou annuler le rdv'))
    return '/missions'
  return `/reservations`
}

function Badge({ children }) {
  const newOnes = useNewNotifications()

  const count = useMemo(() => {
    return newOnes.data ? newOnes.data.length : 0
  }, [newOnes.data])

  return (
    <>
      <span className="relative">
        <div>{children}</div>
        <div
          className={`absolute w-4 h-4 -top-2 !left-0 text-[7px] bg-primary grid place-content-center rounded-full text-white duration-200 ease-[cubic-bezier(0.42,0,0.3,1)] ${
            count > 0 ? 'scale-1' : 'scale-0'
          }`}
        >
          <If test={count > 0}>{count}</If>
        </div>
      </span>
    </>
  )
}

export default function Notifications() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { data, loading } = useRecentNotifications()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const updateRead = useUpdateAreRead()

  const handleIsRead = notificationId => {
    updateRead(notificationId)

    console.log(data);
    

    const notificationElement = document.getElementById(notificationId)
    if (notificationElement) {
      console.log(notificationElement)

      const spanElement = notificationElement.querySelector('span')
      if (spanElement) {
        console.log(notificationElement, spanElement)
        notificationElement.style.backgroundImage = 'none'
        spanElement.style.color = 'gray'
        console.log(notificationElement, spanElement)
        
        setIsDropdownOpen(false)
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  const clear = useClearNotification()

  return (
    <Dropdown.DropdownMenu
      onOpenChange={v => {
        setIsDropdownOpen(v)
        if (v) {
          clear()
        }
      }}
      open={isDropdownOpen}
    >
      <Dropdown.Trigger className="focus:outline-none rx-dropdown-trigger">
        <Badge>
          <Notification />
        </Badge>
      </Dropdown.Trigger>
      <Dropdown.Content className="" sticky="always">
        <If test={loading}>
          <Loading />
        </If>
        <If test={!loading}>
          {!!data &&
            data.map(({ _id, message, reservationId, is_read }) => (
              <Dropdown.Item
                key={_id}
                id={_id}
                style={{
                  backgroundImage: is_read
                    ? ''
                    : 'linear-gradient(335deg, rgba(78, 173, 255,0.2) 0%, #ffffff 50%, rgba(78, 173, 255,0.2) 100%)',
                }}
              >
                <Link
                  to={link(message, reservationId)} 
                >
                  <span
                    key={_id}
                    style={{ color: is_read ? 'gray' : 'black' }}
                    onClick={() => handleIsRead(_id)}
                  >
                    {windowWidth > 1024
                      ? `${message.substring(0, 70)}...`
                      : windowWidth > 600
                      ? `${message.substring(0, 50)}...`
                      : `${message.substring(0, 30)}...`}
                  </span>
                </Link>
              </Dropdown.Item>
            ))}
          <Dropdown.Seperator />
          <Dropdown.Item>
            <Link to="/notifications">Voir toutes les notifications</Link>
          </Dropdown.Item>
        </If>
      </Dropdown.Content>
    </Dropdown.DropdownMenu>
  )
}
