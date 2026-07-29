import React from 'react'
import logo from "../../assets/logo.png";
import { FaUserPlus} from "react-icons/fa";

function AuthHeader() {
  return (
    <>
        <div className="bg-primary w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 shadow fixed top-0 left-0 z-50">
        <img src={logo} alt="Logo" className="w-32 md:w-40" />

        <div className="text-2xl cursor-pointer"><FaUserPlus /></div>
      </div>

      
    </>
  )
}

export default AuthHeader
