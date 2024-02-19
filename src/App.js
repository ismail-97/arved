import React, { useEffect } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'
import AddProdcut from './components/AddProdcut'
import EditProdcut from './components/EditProduct'
import Verification from './components/Verification'
import DepartmentAccounts from './components/DepartmentAccounts'
import PendingAccounts from './components/PendingAccounts'
import Report from './components/Report'

import { setToken } from './services/token'
import { I18nProvider } from './i18n'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { preLoggedUser } from './reducers/loginReducer'

const RoutesAfterLogin = () => {
  const user = useSelector((state) => state.loginInfo)
  return (
    <Routes>
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
const RoutesBeforeLogin = () => {
  return (
    <Routes>
      <Route path="/register" element={<SignUp />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/" element={<Login />} />
      {/* { !user && <Route path="*" element={<Navigate replace to="/" />} /> } */}
    </Routes>
  )
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userInfo')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      dispatch(preLoggedUser(user))
    }
  }, [dispatch])
  const user = useSelector((state) => state.loginInfo)
  return (
    <I18nProvider locale={useSelector((state) => state.language)}>
      <Router>
        <div className="container d-flex ">
          <Header />
          <div className="container ">
            {user ? <RoutesAfterLogin /> : <RoutesBeforeLogin />}
          </div>
          <Footer />
        </div>
      </Router>
    </I18nProvider>
  )
}

export default App
