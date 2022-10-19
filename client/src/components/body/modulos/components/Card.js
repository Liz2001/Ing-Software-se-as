import React from 'react'
import Button from './Button'




function Card({titulo,cuerpo,disponible, completado,id}) {
    const onClick = () => {
        console.log('click')
        //Navigate.(/modulo/{1})
        //COnducir a la otra pagina con click. {id}
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
          {  disponible ? <Button  color= 'steelblue' text='Empezar Curso' onClick={onClick}/>
            : <Button  color= 'gray' text='Empezar curso' onClick={noMostrar}/>
          }          
        </div>
      </div>
    </div>
  )
}

export default Card