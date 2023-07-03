import { useState, useEffect } from 'react'
import If from '../If'
import { HamburgurMenuIcon, CloseMenuIcon } from './Icons'
const MobileViewMenu = props => {
  useEffect(() => {
    return () => props.setIsMenuOpen(false)
  }, [])

  return (
    <button
      className="p-2 lg:p-0 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      aria-expanded="false"
      onClick={() => props.setIsMenuOpen(isIt => !isIt)}
    >
      <If test={!props.isMenuOpen}>
        <HamburgurMenuIcon />
      </If>

      <If test={props.isMenuOpen}>
        <CloseMenuIcon />
      </If>
    </button>
  )
}

export default MobileViewMenu
