import {
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const viewContext = createContext({
  view: 'list',
  switchToListView: () => {},
  switchToMapView: () => {},
})

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState('list')

  const switchToListView = useCallback(() => {
    setView('list')
  }, [])

  const switchToMapView = useCallback(() => {
    setView('map')
  }, [])

  const value = useMemo(
    () => ({
      view,
      switchToListView,
      switchToMapView,
    }),
    [view]
  )

  return <viewContext.Provider value={value}>{children}</viewContext.Provider>
}

export const useView = () => {
  const { view, switchToListView, switchToMapView } = useContext(viewContext)

  return {
    isListView: view === 'list',
    isMapView: view === 'map',
    switchToListView,
    switchToMapView,
  }
}

export const useFilter = () => {
  const [query] = useSearchParams()

  return {
    startDate: Number(query.get('startDate')) || null,
    endDate: Number(query.get('endDate')),
    location: query.get('location'),
  }
}

export const useBreadcrump = () => {
  const path = useLocation()
  const items = path.pathname.split('/')

  const joined = idx => {
    let joined: string[] = []
    for (let i = 0; i <= idx; i++) {
      joined.push(items[i])
    }
    if (joined.length > 1) return joined.join('/')
    return '/' + joined.join('/')
  }

  return {
    joined,
    items: items.at(-1) === '' ? items.slice(0, -1) : items,
  }
}

export const useMap = () => {
  const center = {
    lat: 36.816314,
    lng: 10.131868,
  }

  return {
    center,
  }
}
