import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../css/style.css';


const Login = () => {

  const navigate = useNavigate();
  localStorage.setItem('login', false)
  localStorage.setItem('clientToken', undefined)
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const loginEvent = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:5555/api/auth/login', {
      email: mail,
      password: password,
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          const me = response.data.data.user.role
          const token = response.data.data.token
          localStorage.setItem('clientToken', token)
          me == 'ADMIN' ? navigate('/admin') : navigate('/products')
          console.log(me);
        }
        setLogin(true)
      })
      .catch(err => {
        alert('Account didnt find')
        console.log(err);
      });

    // Request input (mandatory area)
    if (mail.trim().length == 0 || password.trim().length == 0) {
      alert('Please enter the informations')
    }
  }

  const mailControl = (e) => {
    setMail(e.target.value)
  }

  const passwordControl = (e) => {
    setPassword(e.target.value)
  }

  // FORGOT PASSWORD AREA
  const [forgotMail, setForgotMail] = useState('');

  const reset = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5555/api/auth/forgot-password`, {
      email: forgotMail
    }).then(() => {
      alert('Check Your Mail')
    }).catch(() => {
      alert('This Mail Not Found')
    })
  }

  const checkMail = (e) => {
    setForgotMail(e.target.value)
  }

  return (
    <div id='home-page'>

      <input type="checkbox" id='title-chk' />
      <label htmlFor='title-chk' id='title'>Login</label>

      <div id='login'>
        <form className='login-form' >
          <label htmlFor='login-query-mail' >Email</label> <br />
          <input id='login-query-mail' type="text"
            onChange={mailControl}
            value={mail}
            autoComplete='off' /> <br />
          <br />
          <label htmlFor='login-query-password' >Password</label> <br />
          <input id='login-query-password' type="password"
            onChange={passwordControl}
            value={password}
            autoComplete='off' /> <br />

          <input className='submit-btn' type="submit"
            value={'Login'}
            onClick={loginEvent} />
        </form>

        <div>
          <a className="forgot-password-btn" href='#forgot-password-popup'>
            Forgot Password
          </a>
        </div>
        {/* POP-UP START*/}
        <div id='forgot-password-popup'>

          <div className="pop-up">
            <h1>Reset Password</h1>

            <form className='reset-form'>
              <input
                className='forgot-password-mail'
                type="text"
                placeholder='e-mail'
                onChange={checkMail}
                value={forgotMail} />
              <input
                className='forgot-password-submit'
                type="submit"
                value='Confirm'
                onClick={reset} />
            </form>

            <a href='#login' className='close-pop-up'>
              <i className="fa-solid fa-x"></i>
            </a>

          </div>

        </div>

        {/* POP-UP END*/}

        <div className='or'>
          <hr className='left' />OR<hr className='right' />
        </div>

        <div className='register'>
          <Link to='/register'
            style={{ textDecoration: 'none', color: 'black' }} >
            <button>Register Now</button>
          </Link>
        </div>

      </div>
    </div >
  )
}

export default Login