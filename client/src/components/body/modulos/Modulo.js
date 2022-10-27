import React from "react";
import Card from "./components/Card";
import { useState } from "react";
import { useEffect } from "react";
import img1 from "../../images/img1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
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
  CrearClases();


  return (
    <div className="container">
      <div className="row">
        <div className="mt-5">
          <h1 >SELECCIONA EL MÓDULO</h1>
          <p className="border-bottom pb-4 mt-3">Podrás avanzar al siguiente una vez hayas acabado el anterior.</p>
        </div>
        {Objetos.map((task) => {
          if (task.getCompletado() === true) { //Si esta completado, progreso + 1
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
        <div className="container mt-4">
          <div className="row">
            <div className="col-4">
              <img src={img1} className="rounded img-fluid" alt="modulo1" />
            </div>
            <div className="col-4">
              <img src={img2} className="rounded img-fluid" alt="modulo2" />
            </div>
            <div className="col-4">
              <img src={img3} className="rounded img-fluid" alt="modulo3" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="fw-bold fs-3 text-center">
            {"PROGRESO ACTUAL: " +
              Math.round((contadorprogreso / Objetos.length) * 100) + //Calculo el porcentaje
              "%"}
          </h1>
          <div className="text-center form-text">
            * Se actualizará el progreso cuando completes un módulo.
          </div>
        </div>
      </div>
    </div>
  );
}

class ModuloComponente{

  InitModulo(){
    return Modulo()
  }
}

let VistaModulos = new ModuloComponente

export default  VistaModulos.InitModulo;
