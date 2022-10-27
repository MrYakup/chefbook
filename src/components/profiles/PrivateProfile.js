import React from 'react'
import {  Outlet } from "react-router-dom";


function PrivateProfile() {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default PrivateProfile