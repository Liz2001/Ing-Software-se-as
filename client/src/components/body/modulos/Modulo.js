import React from "react";
import Card3 from "./components/Card3";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
const MainFactoria = require("./MainFactoria");

function Modulo() {
  const auth = useSelector(state => state.auth)
  const { user } = auth
  let contadorprogreso = 0;
  const factoria = MainFactoria.default;
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("/module/all_infor"); //Saco de la base de datos
      const jsonData = await response.json(); //Almaceno en un json
      setTodos(jsonData); //Almaceno en un Array
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  let Objetos = [];
  let contador = 0;

  function obtenerProgreso(){
    todos.map((modulo) => {
       Disponible(modulo)
       Completo(modulo)
    })

  }
  function Disponible(modulo){
    if(user.avaliable === 1){
      if(modulo.title === "Avanzado" || modulo.title === "Intermedio"){
          modulo.avaliable= false;
      }
      if(modulo.title === "Principiante"){
          modulo.avaliable = true;
      }
    }
     if(user.avaliable === 2){
      if(modulo.title === "Intermedio" || modulo.title === "Principiante"){
        modulo.avaliable = true;
      }
      if(modulo.title === "Avanzado"){
        modulo.avaliable = false;
      }
  }
  if(user.avaliable === 3){
      modulo.avaliable = true;
   }}

  function Completo(modulo){
      console.log("Entre")
      if(user.completed == 1){
        if(modulo.title === "Principiante"){
          modulo.completed = true;
        }else{
          modulo.completed = false;
        }
      } 
      if(user.completed == 2){
        if(modulo.title === "Intermedio" || modulo.title === "Principiante"){
          modulo.completed = true;
        }else{
          modulo.completed = false;
        }
      }
      if(user.completed == 3){
          modulo.completed = true
      } 

    }



  function CrearClases() {
    if (contador === 0) {
      obtenerProgreso()
      todos.map((task) => {
        //Recorro el Array
        let temp = factoria
          .obtenerModulo()
          .crearModulo(
            task.id,
            task.title,
            task.description,
            task.avaliable,
            task.completed
          ); //Creando clase Modulo
        Objetos.push(temp); //Y lo pongo en un array
      });
      contador++;
    }
  }
  CrearClases();

  return (
    <div className="container">
      <div className="row">
        <div className="mt-5">
          <h1>SELECCIONA EL MÓDULO</h1>
          <p className="border-bottom pb-4 mt-3">
            Podrás avanzar al siguiente una vez hayas acabado el anterior.
          </p>
        </div>
        {Objetos.map((task) => {
          if (task.getCompletado() === true) {
            //Si esta completado, progreso + 1
            contadorprogreso++;
          }
          return (
           <Card3
              key={task.id}
              id={task.getId()}
              titulo={task.getTitulo()}
              cuerpo={task.getTexto()}
              disponible={task.getDisponible()}
              completado={task.getCompletado()}
            />
          );
        })}
        <div className="row mt-4">
          <div className="mt-5">
            <h1 className="fw-bold fs-3 text-center">
              {"PROGRESO ACTUAL: " +
                user.progress +
                //Calculo el porcentaje
                "%"}
            </h1>
            <div className="text-center form-text mb-5">
              * Se actualizará el progreso cuando completes un módulo.
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class ModuloComponente {
  InitModulo() {
    return Modulo();
  }
}

let VistaModulos = new ModuloComponente();

export default VistaModulos.InitModulo;
