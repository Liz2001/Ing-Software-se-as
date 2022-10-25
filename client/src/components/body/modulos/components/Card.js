import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'


function Card({ titulo, cuerpo, disponible, completado, id }) {
  const noMostrar = () => {
    console.log('no disponible')
  }
  return (//Francisco aca se muestra el modulo
    <div className="col-4 mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title fw-bold fs-3 text-center text-uppercase pb-2 border-bottom">Nivel {titulo}</h3>
          <p style={{ textAlign: 'justify' }} className="card-text">{cuerpo}</p>
          {disponible ? <Link to={`/modulo/${id}`} className="btn btn-primary">Empezar módulo</Link>
            : <Button color='gray' text='Módulo bloqueado' onClick={noMostrar} />
          }
        </div>
      </div>
    </div>
  )
}

export default Card