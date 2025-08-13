import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Content from './Content'
import EditAccount from './EditAccount'
import AddProdcut from './AddProdcut'
import EditProdcut from './EditProduct'
import DepartmentAccounts from './DepartmentAccounts'
import PendingAccounts from './PendingAccounts'
import Report from './Report'

const RoutesAfterLogin = ({ user }) => {
  return (
    <Routes>
      <Route path="/edit-account" element={<EditAccount />} />
      <Route path="/add-product" element={<AddProdcut />} />
      <Route path="/edit-product" element={<EditProdcut />} />
      {user.role === 'admin' && (
        <Route
          path="/admin/department-accounts"
          element={<DepartmentAccounts />}
        />
      )}
      {user.role === 'admin' && (
        <Route path="/admin/pending-accounts" element={<PendingAccounts />} />
      )}
      {user.role === 'admin' && (
        <Route path="/admin/create-report" element={<Report />} />
      )}
      <Route path="/profile" element={<Content />} />
      <Route path="/" element={<Navigate replace to="/profile" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default RoutesAfterLogin
