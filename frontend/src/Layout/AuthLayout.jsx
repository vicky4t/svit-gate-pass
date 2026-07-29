import React from 'react';
import AuthHeader from "../components/Header/AuthHeader";
import AuthFooter from "../components/Footer/AuthFooter";
import { Outlet } from "react-router-dom";



function AuthLayout() {
  return (
    <>
      <AuthHeader/>
      <Outlet/>
      <AuthFooter/>
    </>
  )
}

export default AuthLayout
