import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import Test from '../../test/Test'



function Card({titulo,cuerpo,disponible, completado,id}) {
    const redireccionar = () => {
      
    }
    const noMostrar = () =>{
        console.log('no disponible')
        
    }
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{titulo}</h3>
          <p className="card-text">{cuerpo}</p>
          {  disponible ? <Link to= {`/modulo/${id}`} className="btn btn-primary">Empezar Curso</Link>
            : <Button  color= 'gray' text='Empezar curso' onClick={noMostrar}/>
          }          
        </div>
      </div>
    </div>
  )
}

export default Card