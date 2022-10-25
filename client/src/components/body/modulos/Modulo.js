import React from "react";
import Card from "./components/Card";
import { useState } from "react";
import { useEffect } from "react";

const MainFactoria = require("./MainFactoria");
function Modulo() {
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
  function CrearClases() {
    if (contador === 0) {
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
  console.log(todos);
  CrearClases();
  return (
    <div class="row">
      {Objetos.map((task) => {
        if (task.getCompletado() === true) {
          contadorprogreso++;
        }
        return (
          <Card
            key={task.id}
            id={task.getId()}
            titulo={task.getTitulo()}
            cuerpo={task.getTexto()}
            disponible={task.getDisponible()}
            completado={task.getCompletado()}
          />
        );
      })}
      <div className="mt-5">
        <h1 className="text-uppercase fw-bold fs-3 text-center">
          {"Progreso del curso: " +
            Math.round((contadorprogreso / Objetos.length) * 100) +
            "%"}
        </h1>
        <div className="text-center form-text">
          * Se actualizará el progreso cuando completes un módulo.
        </div>
      </div>
    </div>
  );
}

export default Modulo;
