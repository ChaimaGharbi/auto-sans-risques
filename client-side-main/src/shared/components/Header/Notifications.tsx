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

function link(msg, id) {
  if (msg.toLowerCase().includes('veuillez confirmer ou annuler le rdv'))
    return '/missions'
  return `/ongoing/${id}`
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
  const { data, loading } = useRecentNotifications()

  const clear = useClearNotification()

  return (
    <Dropdown.DropdownMenu
      onOpenChange={v => {
        if (v) clear()
      }}
    >
      <Dropdown.Trigger className="focus:outline-none rx-dropdown-trigger">
        <Badge>
          <Notification />
        </Badge>
      </Dropdown.Trigger>
      <Dropdown.Content className="left-4" sticky="always">
        <If test={loading}>
          <Loading />
        </If>
        <If test={!loading}>
          {!!data &&
            data.map(({ _id, message, reservationId }) => (
              <Dropdown.Item key={_id} onClick={() => {}}>
                <Link to={link(message, reservationId)} className="text-black">
                  {message}
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
