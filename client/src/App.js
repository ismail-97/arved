import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import RoutesAfterLogin from './components/RoutesAfterLogin'
import RoutesBeforeLogin from './components/RoutesBeforeLogin'
import { setToken } from './services/token'
import { I18nProvider } from './i18n'

import { BrowserRouter as Router } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { preLoggedUser } from './reducers/loginReducer'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      const loggedUserJSON = window.localStorage.getItem('userInfo')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setToken(user.token)
        await dispatch(preLoggedUser(user))
      }
      setLoading(false)
    }

    initializeApp()
  }, [dispatch])

  const user = useSelector((state) => state.loginInfo)
  const language = useSelector((state) => state.language)

  if (loading) {
    return <div className="spinner"></div>
  }

  return (
    <I18nProvider locale={language}>
      <Router>
        <div className="container d-flex ">
          <Header />
          <div className="container ">
            {user ? <RoutesAfterLogin user={user} /> : <RoutesBeforeLogin />}
          </div>
          <Footer />
        </div>
      </Router>
    </I18nProvider>
  )
}

export default App
