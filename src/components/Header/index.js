import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdMenu, IoIosClose} from 'react-icons/io'
import {useState} from 'react'

import './index.css'

const Header = props => {
  const [isClicked, showMenuList] = useState(false)
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onClickMenuList = event => showMenuList(!event.target.value)
  const onClickCloseMenu = () => showMenuList(false)
  return (
    <>
      <nav className="navbar-bg-container">
        <Link to="/" className="nav-link">
          <div className="logo-and-name-container">
            <img
              src="https://res.cloudinary.com/drjim6cqm/image/upload/v1700491532/Vector_v240xj.png"
              alt="website logo"
              className="jobby-logo"
            />
            <h1 className="header-heading-name">Tasty Kitchens</h1>
          </div>
        </Link>
        <div className="menu-container-for-small-device">
          <IoMdMenu onClick={onClickMenuList} value={isClicked} />
        </div>
        <div className="menu-container">
          <ul className="header-option-container">
            <Link to="/" className="nav-link">
              <li className="header-option">Home</li>
            </Link>
            <Link to="/cart" className="nav-link">
              <li className="header-option">Cart</li>
            </Link>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
      {isClicked && (
        <ul className="header-option-container-for-small-device">
          <li className="close-button-element-container">
            <button type="button" label="button">
              <IoIosClose onClick={onClickCloseMenu} />
            </button>
          </li>
          <Link to="/" className="nav-link">
            <li className="header-option">Home</li>
          </Link>
          <Link to="/cart" className="nav-link">
            <li className="header-option">Cart</li>
          </Link>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>
      )}
    </>
  )
}
export default withRouter(Header)
