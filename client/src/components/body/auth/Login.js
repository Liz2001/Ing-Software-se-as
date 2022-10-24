import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { dispatchLogin } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div className='container'>
      <Link to={'/'}><FontAwesomeIcon icon='fa-solid fa-arrow-left' title='Regresar' className='return' /></Link>
      <div className='login_page shadow-lg p-3 rounded'>
        <h2 className='fw-bold fs-1 text-center'>Iniciar Sesión</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='fs-5 form-label' htmlFor='email'>Correo:</label>
            <input type='email' className='form-control' placeholder='Ingresa tu correo' id='email' value={email} name='email' onChange={handleChangeInput}></input>
            <div className='form-text'>* Nunca compartiremos tu dirección de email con otros.</div>
          </div>
          
          <div className='mb-3'>
            <label className='fs-5 form-label' htmlFor='password'>Contraseña:</label>
            <input type='password' className='form-control' placeholder='Ingresa tu contraseña' id='password' value={password} name='password' onChange={handleChangeInput}></input>
            <div className='form-text'>* Tu contraseña debe ser de 8-20 caracteres, contener letras y números, y no debe tener espacios, caracteres especiales o emojis.</div>
          </div>

          <div className='mb-3'>
            <Link to='/forgot_password'>Olvidé mi contraseña</Link>
          </div>

          <div className='d-grid gap-2 col-4 mx-auto mb-3'>
            <button type='submit' className='btn btn-dark'>INICIA SESIÓN</button>
          </div>
        </form>
        <p className='text-center'>¿Aún no te has registrado? <Link to='/register' > Regístrate Aquí</Link></p>
      </div>
    </div>
  )
}

export default Login