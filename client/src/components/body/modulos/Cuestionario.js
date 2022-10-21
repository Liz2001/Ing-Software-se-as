import React from 'react'
import Button from './components/Button'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'


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

  let pregunt= "https://www.signingsavvy.com/media2/mp4-ld/26/26724.mp4"
  let correct = []
  let incorrect = []  
  let Preguntas =[]
  let preg_esc = []
  let contadorpreg=0

  function Randomizar(){
    if(Preguntas.length > 0){
      if(contadorpreg === 0){
        let random = Math.floor(Math.random() * Preguntas.length)
        preg_esc=Preguntas[random]
        pregunt = preg_esc.question
        correct = preg_esc.answer
        incorrect = preg_esc.respuestainc
        contadorpreg++;
      }
      console.log(contadorpreg)
    }
  }
  CrearClases()
  
  return (

   <div>
        {pregunt}
       <th>
       <video controls width="100%">
       <source src={pregunt} type="video/mp4" />
       Sorry, your browser doesn't support embedded videos.
       </video>
     </th>
    
       <tr>
        <button className='btn btn-primary'>{correct[0]}</button>
        <button className='btn btn-primary'>{incorrect[0]}</button>
        
       </tr>
       <tr>
        <button className='btn btn-primary'>{incorrect[1]}</button>
        <button className='btn btn-primary'>{incorrect[2]}</button>
       </tr>
    </div>
  )
}

export default Cuestionario