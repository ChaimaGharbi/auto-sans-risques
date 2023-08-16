import { Link, LinkProps, useResolvedPath } from 'react-router-dom';

interface Props extends LinkProps {
  shouldMatch?: boolean;
}

function ActiveLink({
  children,
  to,
  shouldMatch = true,
  className = 'text-white',
  ...props
}: Props) {
  const resolved = useResolvedPath(to);
  const { pathname, search } = resolved;
  const isActive =
    pathname + search === window.location.pathname + window.location.search;
    console.log(className);
    

  return (
    <Link
      to={to}
      {...props}
      className={`relative inline-block px-2 py-2 xl:px-3 rounded-md text-xl md:text-xs xl:text-base font-medium ${className} hover:${className}`}
    >
      {children}
      {isActive && (
        <span
          className={`absolute bottom-0 left-2 w-1/2 h-0.5 ${className == 'text-white' ? 'bg-white' :  'bg-[#4EACFE]'} transition-transform transform-gpu origin-bottom duration-300`}
          style={{ transform: 'scaleX(1)' }}
        />
      )}
      
    </Link>
  );
}

export default ActiveLink;

