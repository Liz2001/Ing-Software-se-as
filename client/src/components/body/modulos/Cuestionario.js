import React from 'react'
import Button from './components/Button'
import { useState } from 'react';
import { useEffect } from 'react';

class Pregunta{
    constructor(question, answer, respuestainc){
        this.question = question
        this.answer = answer
        this.respuestainc = respuestainc
    }
}

const Cuestionario = ({id}) => {
  
    const [todos, setTodos] = useState([]);
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
            let temp = new Pregunta(task.question,task.correct,task.incorrect)
            Preguntas.push(temp)
        })
        contador++
        Randomizar()  
    }

    } 

  let pregunt=""
  let correct = []
  let incorrect = []  
  let Preguntas =[]

  let contadorpreg=0
  function Randomizar(){
    if(Preguntas.length > 0){
        let random = Math.floor(Math.random() * Preguntas.length)
        let preg_esc=Preguntas[random]
        pregunt = preg_esc.question
        correct = preg_esc.answer
        incorrect = preg_esc.respuestainc
    }
  }
  function Next(){
    contadorpreg++
  }
   CrearClases() 
  
  return (

   <div>
       <th>{pregunt}</th>
       <tr>
        <button className='btn btn-primary'>{correct[0]}</button>
        <button className='btn btn-primary'>{incorrect[0]}</button>
        
       </tr>
       <tr>
        <button className='btn btn-primary'>{incorrect[1]}</button>
        <button className='btn btn-primary'>{incorrect[2]}</button>
       </tr>
        <button className= 'btn btn-primary' onClick={Next}> Siguiente</button>
    </div>
  )
}

export default Cuestionario