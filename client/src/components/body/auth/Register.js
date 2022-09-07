import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from '../../utils/validation/Validation'

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
    <div className='login_page'>
      <h2>Registro</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Usuario</label>
          <input type='text' placeholder='Ingresa tu usuario' id='name' value={name} name='name' onChange={handleChangeInput}></input>
        </div>
        <div>
          <label htmlFor='email'>Correo</label>
          <input type='text' placeholder='Ingresa tu correo' id='email' value={email} name='email' onChange={handleChangeInput}></input>
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input type='password' placeholder='Ingresa tu contraseña' id='password' value={password} name='password' onChange={handleChangeInput}></input>
        </div>
        <div>
          <label htmlFor='password'>Confirmar Contraseña</label>
          <input type='password' placeholder='Confirma tu contraseña' id='cf_password' value={cf_password} name='cf_password' onChange={handleChangeInput}></input>
        </div>
        <div className='row'>
          <button type='submit'>Regístrate</button>
        </div>
      </form>
      <p>¿Ya te encuentras registrado? <Link to='/login'> Inicia Sesión Aquí</Link></p>
    </div>
  )
}

export default Register