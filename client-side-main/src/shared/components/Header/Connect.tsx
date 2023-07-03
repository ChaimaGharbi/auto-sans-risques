import { useState, useEffect, useCallback } from 'react'
// import AuthModal from "../Auth/AuthModal";
import LoginModal from '../Modal/Authentication'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { Reports } from './Icons'
import { useLogout, useDropDown, useGetUser } from 'app/store/hooks'
import { FiUser as Avatar } from 'react-icons/fi'
import links from 'app/links'
import If from '../If'
import Notifications from './Notifications'
import { useAuthenticationModal } from 'app/store/hooks'

const Connect = () => {
  const { open: modalOpen, toggleModal, closeModal } = useAuthenticationModal()
  const [q] = useSearchParams()
  const needsLogin = q.get('needlogged')
  const [needLogin, setNeedLogin] = useState(false)
  const logout = useLogout()

  const { me, isLogged, role } = useGetUser()

  const { open, toggleDropDown, closeDropDown } = useDropDown()
  /*   function removeQueryParams() {
    const urlWithoutParams = window.location.origin + window.location.pathname
    window.history.pushState({}, '', urlWithoutParams)
  } */
  useEffect(
    () => {
      /*   if (needsLogin) {
      setNeedLogin(true)
    } */
      return () => {
        closeModal()
      }
    },
    [
      /* needsLogin */
    ]
  )

  if (me.loading) {
    return <p></p>
  }

  if (!isLogged) {
    return (
      <>
        <LoginModal open={modalOpen} onClose={closeModal} />
        {/* //       <AuthModal showModal={showModal} closeModal={() => setShowModal(false)} /> */}

        <button onClick={toggleModal} className="button w-32 md:w-40 lg:w-60">
          Mon Espace
        </button>
      </>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <If test={role === 'EXPERT'}>
        <Link to={links.availability} onClick={closeDropDown}>
          <Reports />
        </Link>
      </If>

      <Notifications />
      {/* <button className="">

        <ExampleDropDown />
      </button> */}

      <div className="relative">
        <button onClick={toggleDropDown} className="grid place-content-center">
          <If test={!!me.data?.profile}>
            <img
              src={me.data?.profile}
              alt="avatar"
              className="w-11 h-11 rounded-full mt-[1px]"
            />
          </If>
          <If test={!me.data?.profile}>
            <Avatar className="m-0 text-2xl text-[#868686]" />
          </If>
        </button>
        {open && <div className="fixed inset-0 z-40" onClick={closeDropDown} />}
        {open && (
          <div className="z-50 grid text-center space-y-4 absolute bg-white border border-[#C4CDD5] min-w-[200px] right-0 rounded px-2 py-4 shadow">
            <Link
              to={links.profile}
              className="text-[#949494]"
              onClick={closeDropDown}
            >
              Mon Compte
            </Link>

            <If test={role === 'CLIENT'}>
              <Link
                to={links.missions.reservations}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Mes Réservations
              </Link>

              <Link
                to={links.reclamations}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Mes Reclamations
              </Link>

              <Link
                to={links.missions.clients.reports}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Rapports de diagnostique
              </Link>
            </If>

            <If test={role === 'EXPERT'}>
              <Link
                to={links.availability}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Mes disponibilités
              </Link>

              <Link
                to={links.missions.requests}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Demandes de mission
              </Link>

              <Link
                to={links.missions.ongoing}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Missions en cours
              </Link>

              <Link
                to={links.missions.reports}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Rapports de diagnostique
              </Link>

              <Link
                to={links.payments}
                className="text-[#949494]"
                onClick={closeDropDown}
              >
                Mes Paiements
              </Link>
            </If>

            <button className="text-[#949494]" onClick={logout}>
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Connect
