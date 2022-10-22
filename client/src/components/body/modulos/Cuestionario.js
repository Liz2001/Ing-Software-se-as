import React from 'react'
import Button from './components/Button'
import { useState } from 'react';
import { useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom'
import Video from './components/Video';


const AbstractFactory = require('./Class/AbstractFactory')
const Cuestionario = () => {
const factoria = new AbstractFactory.default()
  let{id} = useParams()

    const [todos, setTodos] = useState([]);
    const [preguntActual,setPreguntaActual] = useState(0)
    const [puntuacion,setPuntuacion] = useState(0)
    const [isfinished,setFinished] = useState(false);
    const getTodos = async () => {
    try {
        const response = await fetch("/question/all_infor");
        const jsonData = await response.json();
        setTodos(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  let Preguntas =[]
  let contador = 0
  function CrearClases(){
    if( contador === 0){
        todos.map((task) => {
           let temp = factoria.obtenerPregunta().crearPregunta(task.question,task.correct,task.incorrect)
           Preguntas.push(temp)
        })
        contador++
        Randomizar()
    }
  } 

  let preg_esc = []
  let contadorpreg=0

  function Randomizar(){
    if(Preguntas.length > 0){
      if(contadorpreg === 0){
        let random = Math.floor(Math.random() * Preguntas.length)
        preg_esc.push(Preguntas[random])
      }
    }
  }

  function Correcto(){
    alert("Correcto");
    window.location.replace("http://localhost:3000/");
  }
  function Incorrecto(){
    alert("Incorrecto")
    window.location.replace(`http://localhost:3000/modulo/${id}`)
  }

  CrearClases()
  

  return (

   <div>{
    preg_esc.map(element => {
      return(
        <table>
        <th>
          <Video  pregunta={element.question}/>
        </th>
        <tr>
           <h1>¿Cual es el gesto que se ve en el video?</h1>
        </tr>
        <tr>
            <button className='btn btn-primary' onClick={Correcto}>{element.answer}</button>
            <button className='btn btn-primary' onClick={Incorrecto}>{element.respuestainc[0] }</button>  
        </tr>
        <tr>
            <button className='btn btn-primary' onClick={Incorrecto}>{element.respuestainc[1]}</button>
            <button className='btn btn-primary' onClick={Incorrecto}>{element.respuestainc[2]}</button>
        </tr>
        </table>      
        )
    })     
   }
   </div>   
  )
}

export default Cuestionario