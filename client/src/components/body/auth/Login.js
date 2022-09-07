import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

function Login() {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useNavigate()
  const { email, password, err, success } = user

  const handleChangeInput = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('/user/login', { email, password })
      setUser({ ...user, err: '', success: res.data.msg })
      localStorage.setItem('firstLogin', true)
      dispatch(dispatchLogin())
      history('/')
    } catch (err) {
      err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <div className='login_page'>
      <h2>Iniciar Sesión</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Correo</label>
          <input type='text' placeholder='Ingresa tu correo' id='email' value={email} name='email' onChange={handleChangeInput}></input>
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input type='password' placeholder='Ingresa tu contraseña' id='password' value={password} name='password' onChange={handleChangeInput}></input>
        </div>
        <div className='row'>
          <button type='submit'>Inicia Sesión</button>
          <Link to='/forgot_password'>Olvidé mi contraseña</Link>
        </div>
      </form>
      <p>¿Aún no te has registrado? <Link to='/register'> Regístrate Aquí</Link></p>
    </div>
  )
}

export default Login