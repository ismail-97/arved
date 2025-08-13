import { Navbar, Container, Nav } from 'react-bootstrap'
import LanguageIcon from '../iconComponents/icons/Language'
import UniversityIcon from '../iconComponents/icons/University'
import AddProductIcon from '../iconComponents/icons/AddProduct'
import SignOutIcon from '../iconComponents/icons/SignOut'
import ProfileIcon from '../iconComponents/icons/Profile'
import ListOfAccountsIcon from '../iconComponents/icons/ListOfAccountsIcon'
import CreateReportIcon from '../iconComponents/icons/CreateReportIcon'
import PendingAccountsIcon from '../iconComponents/icons/PendingAccountsIcon'
import { useSelector, useDispatch } from 'react-redux'
import translate from '../i18n/messages/translate'
import { Link } from 'react-router-dom'
import { toggleLanguage } from '../reducers/languageReducer'
import { clearLoginInfo } from '../reducers/loginReducer'
import React, { useState } from 'react'

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const handleNavCollapse = () => setExpanded(false)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.loginInfo)
  let viewWhenApproved
  const viewWhenLoggedIn = user
    ? { display: 'flex', alignItems: 'center' }
    : { display: 'none' }
  if (user)
    viewWhenApproved =
      user.status === 'approved' && user.isVerified
        ? { display: 'flex', alignItems: 'center' }
        : { display: 'none' }
  else viewWhenApproved = { display: 'none' }

  const logout = async () => {
    setLoading(true)

    try {
      window.localStorage.clear()
      await dispatch(clearLoginInfo())
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const changeLang = (event) => {
    event.preventDefault()

    dispatch(toggleLanguage())
  }

  return (
    <header className="arved-navbar">
      {loading && <div className="spinner"></div>}

      <Navbar className="w-100" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand style={{ color: 'white' }} className="navbar-brand">
            <UniversityIcon className="mr-1" />
            {translate('brand-name')}
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mr-3 mr-1-sm navbar-dark"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end navbar-links "
          >
            <Nav onClick={handleNavCollapse}>
              <Link to="/profile" className="option" style={viewWhenApproved}>
                <ProfileIcon style={{ marginLeft: 3 }} />
                <span className="">{translate('my-profile')}</span>
              </Link>
              <Link
                to="/add-product"
                className="option"
                style={viewWhenApproved}
              >
                <AddProductIcon />
                <span className="nav-link-text">
                  {translate('add-product')}
                </span>
              </Link>
              {user && user.role === 'admin' && (
                <div className=" d-block d-md-none">
                  <Link to="/admin/department-accounts" className="option ">
                    <ListOfAccountsIcon style={{ marginLeft: '-5px' }} />
                    <span className="nav-link-text text-uppercase">
                      {' '}
                      {translate('listOfAccounts')}
                    </span>
                  </Link>
                  <Link to="/admin/pending-accounts" className="option ">
                    <PendingAccountsIcon color="#134383" />
                    <span className="nav-link-text text-uppercase">
                      {' '}
                      {translate('pendingAccounts')}
                    </span>
                  </Link>
                  <Link to="/admin/create-report" className="option">
                    <CreateReportIcon />
                    <span className="nav-link-text text-uppercase">
                      {' '}
                      {translate('createReport')}
                    </span>
                  </Link>
                </div>
              )}
              <Link
                to="/"
                className="option"
                style={viewWhenLoggedIn}
                onClick={() => logout()}
              >
                <SignOutIcon />
                <span className="nav-link-text"> {translate('sign-out')}</span>
              </Link>
              <Link
                to="/"
                className="option"
                style={{ gap: '5px' }}
                onClick={changeLang}
              >
                <LanguageIcon />
                <span className="nav-link-text"> {translate('language')}</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
