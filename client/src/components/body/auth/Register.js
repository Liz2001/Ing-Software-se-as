import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { isEmpty, isEmail, isLength, isMatch } from '../../utils/validation/Validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function Register() {
  const [user, setUser] = useState(initialState)
  const { name, email, password, cf_password, err, success } = user

  const handleChangeInput = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
      return setUser({ ...user, err: 'Por favor, completa todos campos.', success: '' })
    }
    if (!isEmail(email)) {
      return setUser({ ...user, err: 'Email inválido.', success: '' })
    }
    if (isLength(password)) {
      return setUser({ ...user, err: 'La contraseña es muy corta. Debe ser mayor o igual a 8 caracteres.', sucess: '' })
    }
    if (!isMatch(password, cf_password)) {
      return setUser({ ...user, err: 'Las contraseñas no coinciden.', success: '' })
    }
    try {
      const res = await axios.post('/user/register', { name, email, password })
      setUser({ ...user, err: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <div className='container'>
      <Link to={'/login'}><FontAwesomeIcon icon='fa-solid fa-arrow-left' title='Regresar' className='return' /></Link>
      <div className='login_page shadow-lg p-3 rounded'>
        <h2 className="fw-bold fs-1 text-center">Registro</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fs-5 form-label" htmlFor='name'>Usuario:</label>
            <input className="form-control" type='text' placeholder='Ingresa tu usuario' id='name' value={name} name='name' onChange={handleChangeInput}></input>
          </div>

          <div className="mb-3">
            <label className="fs-5 form-label" htmlFor='email'>Correo:</label>
            <input className="form-control" type='email' placeholder='Ingresa tu correo' id='email' value={email} name='email' onChange={handleChangeInput}></input>
          </div>
          <div lassName="mb-3">
            <label className="fs-5 form-label" htmlFor='password'>Contraseña:</label>
            <input className="form-control" type='password' placeholder='Ingresa tu contraseña' id='password' value={password} name='password' onChange={handleChangeInput}></input>
          </div>
          <div className="mb-3">
            <label className="fs-5 form-label" htmlFor='password'>Confirmar contraseña:</label>
            <input className="form-control" type='password' placeholder='Confirma tu contraseña' id='cf_password' value={cf_password} name='cf_password' onChange={handleChangeInput}></input>
          </div>
          <div className="form-text mb-3">
              * Todos los campos son obligatorios.
            </div>
          <div className="d-grid gap-2 col-4 mx-auto mb-3">
            <button className="btn btn-dark" type='submit'>REGÍSTRATE</button>
          </div>
        </form>
        <p className='text-center'>¿Ya te encuentras registrado? <Link to='/login'> Inicia Sesión</Link></p>
      </div>
    </div>
  )
}

export default Register