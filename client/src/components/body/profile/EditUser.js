import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EditUser() {
  const { id } = useParams()
  const history = useNavigate()
  const [editUser, setEditUser] = useState([])
  const users = useSelector(state => state.users)
  const token = useSelector(state => state.token)
  const [checkAdmin, setCheckAdmin] = useState(false)
  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)
  const [num, setNum] = useState(0)

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach(user => {
        if (user._id === id) {
          setEditUser(user)
          setCheckAdmin(user.role === 1 ? true : false)
        }
      })
    } else {
      history('/profile')
    }
  }, [users, id, history])

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(`/user/update_role/${editUser._id}`, {
          role: checkAdmin ? 1 : 0
        }, {
          headers: { Authorization: token }
        })

        setSuccess(res.data.msg)
        setNum(0)
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg)
    }
  }

  const handleCheck = () => {
    setSuccess('')
    setErr('')
    setCheckAdmin(!checkAdmin)
    setNum(num + 1)
  }

  return (
    <div className='container'>
      <Link to={'/profile'}><FontAwesomeIcon icon='fa-solid fa-arrow-left' title='Regresar' className='return' /></Link>
      <div className='profile_page'>
        <div className='col-left'>
          <h2>Editar Credenciales de Usuario</h2>
          <div className='form-group'>
            <label htmlFor='name'>Usuario</label>
            <input type='text' name='name' id='name' defaultValue={editUser.name} disabled></input>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Correo</label>
            <input type='email' name='email' id='email' defaultValue={editUser.email} disabled></input>
          </div>
          <div className='form-group'>
            <label className='admin_ckeckbox' htmlFor='isAdmin'>Docente
              <input type='checkbox' id='isAdmin' checked={checkAdmin} onChange={handleCheck}></input>
              <span className='checkmark'></span>
            </label>
          </div>
          <button onClick={handleUpdate}>Actualizar credenciales</button>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>
      </div>
    </div>
  )
}

export default EditUser