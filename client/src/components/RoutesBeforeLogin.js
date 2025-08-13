import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
import Verification from './Verification'

const RoutesBeforeLogin = () => {
  return (
    <Routes>
      <Route path="/register" element={<SignUp />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default RoutesBeforeLogin
