import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';

function EditUser() {
  const { id } = useNavigate()
  const history = useNavigate()
  const [editUser, setEditUser] = useState([])
  const users = useSelector(state => state.users)
  const token = useSelector(state => state.users)
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

  return (
    <div className='profile_page'>
      EditUser
    </div>
  )
}

export default EditUser