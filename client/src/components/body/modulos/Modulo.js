import React from 'react'
import Card from './components/Card'

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

const tasks = [
    {
        id: 1,
        text: 'Principiante',
        cuerpo: 'En este curso aprenderas a blablabla',
        disponible: true,
        completado: false
  
    },
    {
        id:2,
        text : 'Intermedio',
        cuerpo: 'En este curso aprenderas a blablabla',
        disponible: false,
        completado: false
    },
    {
        id: 3,
        text : 'Avanzado',
        cuerpo: 'En este curso aprenderas a blablabla',
        disponible: false,
        completado: false
    }
  ]
  let cont = 0
function CrearModelo(){
    if(cont == 0){
        
    }
}
  let Objetos = []
  let contador = 0;
function CrearClases(){
    if( contador == 0){
        tasks.map((task) => {
            let temp = new Modulos(task.id,task.text,task.cuerpo,task.disponible,task.completado)
            Objetos.push(temp)
        })
        contador++  
    }
}  
function Modulo() {
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