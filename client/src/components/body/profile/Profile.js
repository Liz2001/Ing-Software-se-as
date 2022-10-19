import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { isLength, isMatch } from '../../utils/validation/Validation';
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification';
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/usersAction';

const initialState = {
  name: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function Profile() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)
  const { user, isAdmin } = auth
  const [data, setData] = useState(initialState)
  const { name, password, cf_password, err, success } = data
  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res))
      })
    }
  }, [token, isAdmin, dispatch, callback])

  const handleChange = event => {
    const { name, value } = event.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }

  const updateInformation = () => {
    try {
      axios.patch('/user/update', {
        name: name ? name : user.name,
        avatar: avatar ? avatar : user.avatar
      }, {
        headers: { Authorization: token }
      })
      setData({ ...data, err: '', success: 'Actualización completa.' })
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  const updatePassword = () => {
    if (isLength(password)) {
      return setData({ ...data, err: 'La contraseña es muy corta. Debe ser mayor o igual a 8 caracteres.', sucess: '' })
    }
    if (!isMatch(password, cf_password)) {
      return setData({ ...data, err: 'Las contraseñas no coinciden.', success: '' })
    }
    try {
      axios.post('/user/reset', { password }, {
        headers: { Authorization: token }
      })
      setData({ ...data, err: '', success: 'Actualización completa.' })
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  const handleChangeAvatar = async (event) => {
    event.prevetDefault()
    try {
      const file = event.target.files[0]
      if (!file) {
        return setData({ ...data, err: 'Ningún archivo fue cargado.', success: '' })
      }
      if (file.size > 1024 * 1024) {
        return setData({ ...data, err: 'El tamaño de la imagen debe ser menor a 1mb.', success: '' })
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return setData({ ...data, err: 'Formatos de archivo no soportados. Debe ser jpeg o png.', success: '' })
      }
      let formData = new FormData()
      formData.append('file', file)
      setLoading(true)
      const res = await axios.post('/api/upload_avatar', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      })
      setLoading(false)
      setAvatar(res.data.url)
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  const handleUpdate = () => {
    if (name || avatar) {
      updateInformation()
    }
    if (password) {
      updatePassword()
    }
  }

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm('¿Está Seguro de Eliminar?')) {
          setLoading(true)
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token }
          })
          setLoading(false)
          setCallback(!callback)
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Cargando...</h3>}
      </div>
      <div className='profile_page'>
        <div className='col-left'>
          <h2>{isAdmin ? 'Perfil de Administrador' : 'Perfil de Usuario'}</h2>
          <div className='avatar'>
            <img src={avatar ? avatar : user.avatar} alt=''></img>
            <span>
              <i className='fa-solid fa-camera'></i>
              <p>Cambiar</p>
              <input type='file' name='file' id='file_upload' onChange={handleChangeAvatar}></input>
            </span>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Usuario</label>
            <input type='text' name='name' id='name' defaultValue={user.name} placeholder='Usuario' onChange={handleChange}></input>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Correo</label>
            <input type='email' name='email' id='email' defaultValue={user.email} placeholder='Correo' disabled></input>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Nueva Contraseña</label>
            <input type='password' name='password' id='password' placeholder='Ingresa tu contraseña' value={password} onChange={handleChange}></input>
          </div>
          <div className='form-group'>
            <label htmlFor='cf_password'>Confirmar Nueva Contraseña</label>
            <input type='password' name='cf_password' id='cf_password' placeholder='Confirma tu contraseña' value={cf_password} onChange={handleChange}></input>
          </div>
          <div>
            <em style={{ color: 'crimson' }}>
              * Si actualizas tu contraseña desde tu perfil de usuario, no podrás loguearte rápidamente por Google o Facebook.
            </em>
          </div>
          <button disabled={loading} onClick={handleUpdate}>Actualizar datos</button>
        </div>
        <div className='col-right'>
          <h2>{isAdmin ? 'Alumnos' : 'Estadísticas'}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className='data_table'>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Credenciales</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {
                          user.role === 1
                            ? <i className='fa-solid fa-chalkboard-user' title='Docente'></i>
                            : <i className='fa-solid fa-graduation-cap' title='Alumno'></i>
                        }
                      </td>
                      <td>
                        <Link to={`/edit_user/${user._id}`}><i className='fa-solid fa-pen-to-square' title='Editar'></i></Link>
                        <button class='btn' onClick={() => handleDelete(user._id)}><i className='fa-solid fa-trash' title='Eliminar'></i></button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile