import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar-bg-container">
      <Link to="/" className="nav-link">
        <img
          src="https://res.cloudinary.com/drjim6cqm/image/upload/v1700491532/Vector_v240xj.png"
          alt="website logo"
          className="jobby-logo"
        />
      </Link>
      <div className="menu-container">
        <h1 className="header-heading-name">Tasty Kitchens</h1>
        <ul className="header-option-container">
          <Link to="/" className="nav-link">
            <li className="header-option">Home</li>
          </Link>
          <Link to="/cart" className="nav-link">
            <li className="header-option">Cart</li>
          </Link>
        </ul>
      </div>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
