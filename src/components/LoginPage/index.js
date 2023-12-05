import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/drjim6cqm/image/upload/v1700491532/Vector_v240xj.png"
              alt="website logo"
              className="website-logo-style"
            />
          </div>
          <h1 className="testy-kitchen-heading">Tasty Kitchens</h1>
          <h1>Login</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">
              <label htmlFor="username" className="label-style">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="USERNAME"
                id="username"
                className="input-style"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-style">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="PASSWORD"
                id="password"
                className="input-style"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/drjim6cqm/image/upload/v1700491605/Rectangle_1456_x2usyl.png"
            className="login-page-image"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}
export default Login
