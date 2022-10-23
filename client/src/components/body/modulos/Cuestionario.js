
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Video from './components/Video';
import factoria from './MainFactoria';

const Cuestionario = () => {
  const [todos, setTodos] = useState([]);
  let{id} = useParams()
  let _id = parseInt(id)
  let preg_esc = []
  let contadorpreg=0

  const getTodos = async () => {

    try {
        const response = await fetch("/question/all_infor");
        const jsonData = await response.json();
        setTodos(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  }; // getTodos(BASE DE DATOS -->) SET TODOS(ALMACENA LOS OBJETOS QUE ME HAN DADO) --> CREAR CLASES(TODOS LOS OBJETOS LO TRANSFORMO) --> RANDOMIZAR(ELIGE UN OBJETO) --> PINTA TODO

  useEffect(() => {
   getTodos();

  }, []);

  let Preguntas =[]
  let contador = 0
  function CrearClases(){
    if( contador === 0){
        todos.map((task) => {
           let temp = factoria.obtenerPregunta().crearPregunta(task.module,task.question,task.correct,task.incorrect)
           Preguntas.push(temp)
           console.log(Preguntas)
        })
        contador++
        Randomizar()
    }
  } 

  function Randomizar(){
    if(Preguntas.length > 0){
      if(contadorpreg === 0){
        let random = Math.floor(Math.random() * Preguntas.length)
        preg_esc.push(Preguntas[random])
      }
    }
  }
  const updateStatus = async (id, avaliable, completed) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/module//update/${id}/${avaliable}/${completed}`, {
        method : 'PATCH',
        body: JSON.stringify({
          avaliable: avaliable,
          completed: completed
        })
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  function Updatear(){
    updateStatus(id.toString(), 'true', 'true')
    if(_id < 3){
      updateStatus((_id+1).toString(),'true','false')
    }else{
      updateStatus(id.toString(),'true','true')
    }
  }
  function Correcto(){
    Updatear()
    alert("Correcto");
    window.location.replace(`/`)
  }
  function Incorrecto(){
    alert("Incorrecto")
    window.location.replace(`http://localhost:3000/modulo/${id}`)
  }

  CrearClases();

  return (

   <div>{
    preg_esc.map(element => {
      return(
        <table>
        <th>
          <Video  pregunta={element.getQuestion()}/>
        </th>
        <tr>
           <h1>¿Cual es el gesto que se ve en el video?</h1>
        </tr>
        <tr>
            <button className='btn btn-primary' onClick={Correcto}>{element.getAnswer()}</button>
            <button className='btn btn-primary' onClick={Incorrecto}>{element.getRespuestaInc()[0] }</button>  
        </tr>
        <tr>
            <button className='btn btn-primary' onClick={Incorrecto}>{element.getRespuestaInc()[1]}</button>
            <button className='btn btn-primary' onClick={Incorrecto}>{element.getRespuestaInc()[2]}</button>
        </tr>
        </table>      
        )
    })     
   }
   </div>   
  )
}

export default Cuestionario