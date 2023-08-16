import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/home" className="flex items-center justify-start cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      
       <img src="/logos-06.png" alt="logo" className='w-40'/>
     
    </Link>
  )
}

export default Logo
