import { createContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { useReceiveNotification } from 'app/store/hooks'
interface SocketContextProps {
  socket: Socket | null
  on: (event: string, callback: (data: any) => void) => void
  off: (event: string, callback: (data: any) => void) => void
  emit: (event: string, data?: any) => void
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  on: () => {},
  off: () => {},
  emit: () => {},
})

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const publish = useReceiveNotification()

  useEffect(() => {
    const socket = io('http://149.202.50.65:8080', {
      transports: ['websocket'],
      query: {
        token: localStorage.getItem('token'),
      },
    })
    setSocket(socket)
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('connect_error', e => {})

    socket.on('api', msg => {
      const { event, data } = msg
      publish(data)
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider
      value={{ socket, on: socket?.on, off: socket?.off, emit: socket?.emit }}
    >
      {children}
    </SocketContext.Provider>
  )
}
