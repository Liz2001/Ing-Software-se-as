
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLength, isMatch } from '../../utils/validation/Validation';
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification';
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/usersAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfeVista() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)
  const { user, isAdmin } = auth
  const dispatch = useDispatch()
  const [callback, setCallback] = useState(false)
  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res))
      })
    }
  }, [token, isAdmin, dispatch, callback])

  return (
    <tbody> 
    {
      users.map((user) => {
        if(user.role == 0){
            /* nombre, email y progreso */
            return(
                <tr>
                <td>{user.name+' '}</td> 
                <td>{user.email+' '}</td>
                <td>{user.progress + '%'}</td>
              </tr>
            );
        }
      })}
  </tbody>
  )
}

export default ProfeVista