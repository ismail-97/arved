import { Navbar, Container, Nav } from 'react-bootstrap'
import LanguageIcon from '../iconComponents/icons/Language'
import UniversityIcon from '../iconComponents/icons/University'
import AddProductIcon from '../iconComponents/icons/AddProduct'
import SignOutIcon from '../iconComponents/icons/SignOut'
import ProfileIcon from '../iconComponents/icons/Profile'
import { useSelector, useDispatch } from 'react-redux'
import translate from '../i18n/messages/translate'
import { useNavigate, Link } from "react-router-dom"
import { toggleLanguage } from '../reducers/languageReducer'
import { clearLoginInfo } from '../reducers/loginReducer'
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.loginInfo)
    let viewWhenApproved;
    const viewWhenLoggedIn = user ? { display: "flex", alignItems: "center" } : { display: "none" }
    if (user)
        viewWhenApproved =
        user.status === 'approved' && user.isVerified ?
            { display: "flex", alignItems: "center" } :
            { display: "none" }
    else
        viewWhenApproved = { display: "none" }

    const logout = () => {
        window.localStorage.clear()
        dispatch(clearLoginInfo())
        navigate('/')
        window.location.reload();
    }
    const changeLang = () => {
        dispatch(toggleLanguage())
    }
    return (
        <header className="arved-navbar">
            <Navbar className="w-100" expand="lg">
                <Container >
                    <Navbar.Brand style={{ color: "white", fontSize: "180%" }} >
                        <UniversityIcon className="mr-1" />
                        {translate('brand-name')}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Link to="/profile" className="option align-items-end" style={viewWhenApproved}>
                                <ProfileIcon />
                                {translate('my-profile')}
                            </Link>
                            <Link to="/add-product" className="option" style = {viewWhenApproved}>
                                <AddProductIcon />
                                {translate('add-product')}
                            </Link>
                            <Link to="/" className="option" style={viewWhenLoggedIn} onClick={() => logout()}>
                                <SignOutIcon className="" />
                                {translate('sign-out')}
                            </Link>
                            <Link to="/" className="option ml-lg-4 justify-content-start" style={{gap: "5px"}} onClick={()=> changeLang()}>
                                <LanguageIcon />
                                {translate('language')}
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}



export default Header