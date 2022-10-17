import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { isLength, isMatch } from '../../utils/validation/Validation';

const initialState = {
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function ResetPassword() {
  const [data, setData] = useState(initialState)
  const { token } = useParams()
  const { password, cf_password, err, success } = data

  const handleChangeInput = event => {
    const { name, value } = event.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }

  const handleResetPassword = async () => {
    if (isLength(password)) {
      return setData({ ...data, err: 'La contraseña es muy corta. Debe ser mayor o igual a 8 caracteres.', sucess: '' })
    }
    if (!isMatch(password, cf_password)) {
      return setData({ ...data, err: 'Las contraseñas no coinciden.', success: '' })
    }
    try {
      const res = await axios.post('/user/reset', { password }, {
        headers: { Authorization: token }
      })
      return setData({ ...data, err: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <div className='fg_pass'>
      <h2>Reestablece Tu Contraseña</h2>
      <div className='row'>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor='password'>Ingresa tu nueva contraseña</label>
        <input type='password' name='password' id='password' value={password} onChange={handleChangeInput}></input>
        <label htmlFor='cf_password'>Confirma tu nueva contraseña</label>
        <input type='password' name='cf_password' id='cf_password' value={cf_password} onChange={handleChangeInput}></input>
        <button onClick={handleResetPassword}>Guardar</button>
      </div>
    </div>
  )
}

export default ResetPassword