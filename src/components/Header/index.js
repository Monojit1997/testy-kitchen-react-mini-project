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
        <div>
          <img
            src="https://res.cloudinary.com/drjim6cqm/image/upload/v1700491532/Vector_v240xj.png"
            alt="website logo"
            className="jobby-logo"
          />
          <h1 className="header-heading-name">Tasty Kitchens</h1>
        </div>
      </Link>
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
  )
}
export default withRouter(Header)
