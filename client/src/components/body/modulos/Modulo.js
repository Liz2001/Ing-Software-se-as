import React from 'react'
import Card from './components/Card'
import { useState } from 'react';
import { useEffect } from 'react';

class Modulos{
    constructor(id, titulo,texto,disponible,completado)
    {
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.disponible = disponible;
        this.completado = completado
    }
}




function Modulo() {
    const [todos, setTodos] = useState([]);
    const getTodos = async () => {
    try {
        const response = await fetch("/module/all_infor");
        const jsonData = await response.json();
        setTodos(jsonData)
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
        todos.map((task) => {
            let temp = new Modulos(task.id,task.title,task.description,task.avaliable,task.completed)
            Objetos.push(temp)
        })
        contador++  
    }
}  
    console.log(todos)
  CrearClases()
  return (
    <div class="row">
       {Objetos.map((task) => (       
       <Card key = {task.id} id= {task.id} titulo={task.titulo} cuerpo ={task.texto} disponible = {task.disponible} completado = {task.completado} />
       )
       )}
    </div>
  )
}

export default Modulo