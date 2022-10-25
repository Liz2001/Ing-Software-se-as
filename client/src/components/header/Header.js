import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const auth = useSelector(state => state.auth)
  const { user, isLogged } = auth

  const handleLogout = async () => {
    try {
      await axios.get('/user/logout')
      localStorage.removeItem('firstLogin')
      window.location.href = '/';
    } catch (err) {
      window.location.href = '/';
    }
  }

  const userLink = () => {
    return <li className='drop-nav'>
      <Link to='#' className='avatar' style={{ textDecoration:'none' }}><img src={user.avatar} alt='User avatar'/> {user.name}</Link>
      <ul className='dropdown'>
        <li><Link to='/profile' style={{ textDecoration:'none' }}>Perfil</Link></li>
        <li><Link to='/' onClick={handleLogout} style={{ textDecoration:'none' }}>Cerrar Sesión</Link></li>
      </ul>
    </li>
  }

  const transForm = {
    transform: isLogged ? 'translateY(-5px)' : 0
  }

  return (
    <header>
      <div className='logo'>
        <h1><Link to='/' style={{ textDecoration:'none' }}><FontAwesomeIcon icon='fa-solid fa-thumbs-up' /> Positive Signs</Link></h1>
      </div>
      <ul style={transForm}>
        <li><Link to='/' style={{ textDecoration:'none' }}><FontAwesomeIcon icon='fa-solid fa-hand-holding-dollar' /> Donaciones</Link></li>
        {
          isLogged
            ? userLink()
            : <li><Link to='/login' style={{ textDecoration:'none' }}><FontAwesomeIcon icon='fa-solid fa-user' /> Iniciar Sesión</Link></li>
        }
      </ul>
    </header>
  )
}

export default Header