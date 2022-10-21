import React, { useState } from 'react';
import axios from 'axios';
import { isEmail } from '../../utils/validation/Validation';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const initialState = {
  email: '',
  err: '',
  success: ''
}

function ForgotPassword() {
  const [data, setData] = useState(initialState)
  const { email, err, success } = data

  const handleChangeInput = event => {
    const { name, value } = event.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }

  const handleForgotPassword = async () => {
    if (!isEmail(email)) {
      return setData({ ...data, err: 'Email Inválido.', success: '' })
    }
    try {
      const res = await axios.post('/user/forgot', { email })
      return setData({ ...data, err: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <div className='fg_pass'>
      <div>
        <Link to={'/login'}><FontAwesomeIcon icon='fa-solid fa-arrow-left' title='Regresar' className='return' /></Link>
      </div>
      <h2>¿Olvidaste Tu Contraseña?</h2>
      <div className='row'>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor='email'>Ingresa tu correo electrónico</label>
        <input type='email' name='email' id='email' value={email} onChange={handleChangeInput}></input>
        <button onClick={handleForgotPassword}>Verifica tu correo</button>
      </div>
    </div>
  )
}

export default ForgotPassword