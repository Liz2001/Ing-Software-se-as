import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import ActivationEmail from './auth/ActivationEmail';
import { useSelector } from 'react-redux'
import Missing from '../utils/missing/Missing';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Profile from './profile/Profile';
import EditUser from './profile/EditUser';

function Body() {
  const auth = useSelector(state => state.auth)
  const { isLogged, isAdmin } = auth

  return (
    <section>
      <Routes>
        <Route path='/login' element={isLogged ? <Missing /> : <Login />} exact />
        <Route path='/register' element={isLogged ? <Missing /> : <Register />} exact />
        <Route path='/forgot_password' element={isLogged ? <Missing /> : <ForgotPassword />} exact />
        <Route path='/user/reset/:token' element={isLogged ? <Missing /> : <ResetPassword />} exact />
        <Route path='/user/activate/:activation_token' element={<ActivationEmail />} exact />
        <Route path='/profile' element={isLogged ? <Profile /> : <Missing />} exact />
        <Route path='/edit_user/:id' element={isAdmin ? <EditUser /> : <Missing />} exact />
      </Routes>
    </section>
  )
}

export default Body