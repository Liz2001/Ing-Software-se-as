import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './home.css';

function Home() {
  return (
    <div className='home_page'>
      <h2>DEMUESTRA TUS CONOCIMIENTOS EN LEGUAJE DE SEÑAS</h2>
      <p>
        Pantallazo de prueba
        Si puedes ver esto, significa que todo funciona bien :)
        Luego le pongo una interfaz más chvr.
        Debes iniciar sesión o registrarte para realizar el quiz
      </p>
      <Link to='/login'><FontAwesomeIcon icon='fa-solid fa-user' /> Iniciar Sesión</Link>
    </div>
  )
}

export default Home