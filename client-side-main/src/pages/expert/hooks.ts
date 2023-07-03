import { useLocation } from 'react-router-dom'

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
