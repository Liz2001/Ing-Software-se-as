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
import Modulo from './modulos/Modulo';
import Test from './test/Test';
import Cuestionario from './modulos/Cuestionario';

function Body() {
  const auth = useSelector(state => state.auth)
  const { isLogged, isAdmin } = auth

  return (
    <section>
      <Routes>
        <Route path='/login' element={isLogged ? <Missing /> : <Login />} />
        <Route path='/register' element={isLogged ? <Missing /> : <Register />} />
        <Route path='/forgot_password' element={isLogged ? <Missing /> : <ForgotPassword />} />
        <Route path='/user/reset/:token' element={isLogged ? <Missing /> : <ResetPassword />} />
        <Route path='/user/activate/:activation_token' element={<ActivationEmail />} />
        <Route path='/profile' element={isLogged ? <Profile /> : <Missing />} />
        <Route path='/edit_user/:id' element={isAdmin ? <EditUser /> : <Missing />} />
        <Route path='/' element={isLogged ? <Modulo /> : <></>} exact />
        <Route path='/test' element={isLogged ? <Test /> : <Missing />} />
        <Route path='/modulo/:id' element={isLogged ?  <Cuestionario />: <Missing />} />
      </Routes>
    </section>
  )
}

export default Body