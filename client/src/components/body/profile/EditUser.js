import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';

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
      history.push('/profile')
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
    <div className='profile_page edit_user'>
      <div className='row'>
        <button onClick={() => history.goBack()} className='go_back'>Regresar</button>
      </div>
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
          <input type='checkbox' id='isAdmin' checked={checkAdmin} onChange={handleCheck}></input>
          <label htmlFor='isAdmin'>Docente</label>
        </div>
        <button onClick={handleUpdate}>Actualizar credenciales</button>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </div>
  )
}

export default EditUser