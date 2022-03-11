import React, { Component } from 'react'
import axios from 'axios'
import '../css/register.css'
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      mail: '',
      password: '',
      result: ''
    }
  }

  register = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5555/api/auth/register', {
      username: this.state.username,
      email: this.state.mail,
      password: this.state.password
    })
      .then(response => {
        console.log(response);
        this.setState({ result: response.statusText })
        alert(response.data.message)
      })
      .catch(err => console.log(err))
  }

  usernameControl = (e) => {
    this.setState({ username: e.target.value })
  }

  mailControl = (e) => {
    this.setState({ mail: e.target.value })
  }

  passwordControl = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    const { username, mail, password } = this.state
    return (
      <div id='register'>
        <div className="user">
          <header className="user__header">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg"
              alt=""
            />
            <h1 className="user__title">JOİN US</h1>
          </header>

          <form className="form">
            <div className="form__group">
              <input
                type="text"
                placeholder="Username"
                className="form__input"
                onChange={this.usernameControl}
                value={username}
              />
            </div>

            <div className="form__group">
              <input
                type="email"
                placeholder="Email"
                className="form__input"
                onChange={this.mailControl}
                value={mail}
              />
            </div>

            <div className="form__group">
              <input  
                type="password"
                placeholder="Password"
                className="form__input"
                onChange={this.passwordControl}
                value={password}
              />
            </div>

            <button
              className="btn"
              type="button"
              onClick={this.register}>
              Register
            </button>

            <Link to={'/'}>
              <button
                className='already-user'>
                Already have an account? Back to login
              </button>
              </Link>
          </form>

        </div>
      </div>
    )
  }
}

export default Register;