import { useState } from 'react'
import Link from './ActiveLink'
import Connect from './Connect'
import If from '../If'
import Logo from './Logo'
import MobileViewMenu from './MobileViewMenu'
import Container from '../Container'
import { useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
    window.scrollTo({ top: 0});
    console.log("menu_closed");
  }
  const handleCloseMenuAssist = () => {
    setIsMenuOpen(false);
    console.log("menu_closed");
    
  }

  return (
    <>
      <If test={isMenuOpen}>
        <div
          className="fixed inset-0 bg-black/80 z-50 "
          onClick={handleCloseMenu}
        />
      </If>
      <div
        className={`block sm:block fixed top-0 z-[2001] bg-white w-full h-screen duration-300 ${
          isMenuOpen ? 'right-20' : 'right-full'
        } `}
      >
        <div className="grid place-content-center h-full justify-end xxs:justify-center">
          <div className="flex flex-col items-start h-full space-y-3">
            <Link onClick={handleCloseMenu} to="/home" className="text-[#4EACFE]">
              Accueil
            </Link>
            <Link onClick={handleCloseMenu} to="/about" className="text-[#4EACFE]">
             À Propos
            </Link>
            <Link onClick={handleCloseMenu} to="/services" className="text-[#4EACFE]">
              Nos Services
            </Link>
            <Link
              shouldMatch={false}
              onClick={handleCloseMenuAssist}
              to="/home?to=assistance"
              className="text-[#4EACFE]"
            >
              Assistance
            </Link>
            <Link onClick={handleCloseMenu} to="/voiture_certifiee" className="text-[#4EACFE]">
              Voiture Certifiée
            </Link>
            <Link onClick={handleCloseMenu} to="/contact" className="text-[#4EACFE]" >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-[#4EACFE] fixed z-[2001] w-full 5-[6rem] border-b-2 py-4">
        <Container>
          <div className="flex items-center justify-between space-x-1">
            <div className="md:hidden">
              <MobileViewMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>

            <div className={`flex-1 flex items-center justify-between`}>
              <Logo />

              <div className="hidden md:block sm:ml-6 ">
                <div className="flex space-x-1 lg:space-x-4  items-center h-full">
                  <Link onClick={handleCloseMenu} to="/about" className='text-white'>
                  À Propos
                  </Link>
                  <Link onClick={handleCloseMenu} to="/services" className='text-white'>
                    Nos Services
                  </Link>
                  <Link
                    shouldMatch={false}
                    onClick={handleCloseMenuAssist}
                    to="/home?to=assistance"
                    className='text-white'
                  >
                    Assistance
                  </Link>
                  <Link onClick={handleCloseMenu} to="/voiture_certifiee" className='text-white'>
                    Voiture Certifiée
                  </Link>
                  <Link onClick={handleCloseMenu} to="/contact" className='text-white'>
                    Contact
                  </Link>
                </div>
              </div>

              <Connect />
            </div>
          </div>
        </Container>
      </nav>
    </>
  )
}

export default Header
