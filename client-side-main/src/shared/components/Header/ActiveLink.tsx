import { Link, LinkProps, useResolvedPath, useMatch } from 'react-router-dom'

interface Props extends LinkProps {
  shouldMatch?: boolean
}

function ActiveLink({ children, to, shouldMatch = true, ...props }: Props) {
  const resolved = useResolvedPath(to)
  const { pathname, search } = resolved;
  const isActive = pathname + search === window.location.pathname + window.location.search;

  
  return (
    <>
      <Link
        to={to}
        {...props}
        className={`px-2 py-2 xl:px-3 rounded-md text-xl md:text-xs xl:text-base font-medium ${
          isActive
            ? 'bg-primary text-white hover:text-white'
            : 'text-gray-600 hover:bg-primary hover:text-white '
        }`}
      >
        {children}
      </Link>
    </>
  )
}

export default ActiveLink
