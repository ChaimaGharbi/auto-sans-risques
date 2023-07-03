import { useState, useEffect } from 'react'
import Governerates from '../Governerates'
import Register from '../Register'

const Signup = ({ onClose, switchToLogin }) => {
  return (
    <div className="bg-white rounded-md ">
      <div className="bg-primary rounded-t-md grid place-content-center p-3">
        <img src="/big-logo.svg" alt="Logo" className="h-20" />
      </div>
      <div className="rounded p-10 grid gap-y-4">
        <h1 className="font-medium text-xl text-center">S'inscrire</h1>
        <Register switchToLogin={switchToLogin} />
      </div>
    </div>
  )
}

export default Signup
