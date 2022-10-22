import React from 'react'
import Card from './components/Card'
import { useState } from 'react';
import { useEffect } from 'react';

const MainFactoria = require('./MainFactoria')
function Modulo() {
    const factoria = MainFactoria.default
    const [todos, setTodos] = useState([]);
    const getTodos = async () => {
    try {
        const response = await fetch("/module/all_infor"); //Saco de la base de datos
        const jsonData = await response.json(); //Almaceno en un json
        setTodos(jsonData) //Almaceno en un Array
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  
  let Objetos = []
  let contador = 0;
function CrearClases(){
    if( contador === 0){
        todos.map((task) => { //Recorro el Array
            let temp = factoria.obtenerModulo().crearModulo(task.id,task.title,task.description,task.avaliable,task.completed) //Creando clase Modulo
            Objetos.push(temp) //Y lo pongo en un array
        })
        contador++  
    }
}  
    console.log(todos)
  CrearClases()
  return (
    <div class="row">
       {Objetos.map((task) => ( //Lo recorro y lo pinto.      
       <Card key = {task.id} id= {task.getId()} titulo={task.getTitulo()} cuerpo ={task.getTexto()} disponible = {task.getDisponible()} completado = {task.getCompletado()} /> 
       )
       )}
    </div>
  )
}

export default Modulo