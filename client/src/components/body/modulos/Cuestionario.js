import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Video from "./components/Video";
import factoria from "./MainFactoria";

function Cuestionario(){
  const [todos, setTodos] = useState([]);
  let { id } = useParams();
  let _id = parseInt(id);
  let preg_esc = [];
  let contadorpreg = 0;
  let module = "";


  const getTodos = async () => {
    try {
      if (_id == 1) {
        module = "Principiante";
      } else if (id == 2) {
        module = "Intermedio";
      } else {
        module = "Avanzado";
      }
      const response = await fetch(`/question/infor/${module}`);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }; 

  useEffect(() => {
    getTodos();
  }, []);

  let Preguntas = [];
  let contador = 0;
  function CrearClases() {
    if (contador === 0) {
      todos.map((task) => {
        let temp = factoria
          .obtenerPregunta()
          .crearPregunta(
            task.module,
            task.question,
            task.correct,
            task.incorrect
          );
        Preguntas.push(temp);
        console.log(Preguntas);
      });
      contador++;
      Randomizar();
    }
  }

  function Randomizar() { //Funcion para randomizar, y obtener una pregunta aleatoria.
    if (Preguntas.length > 0) { //Una vez se hayan recibido las preguntas y transformado a clase.
      if (contadorpreg === 0) {//mientras que no se haya elegido.
        let random = Math.floor(Math.random() * Preguntas.length);
        preg_esc.push(Preguntas[random]);
      }
    }
  }

  const updateStatus = async (id, avaliable, completed) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/module//update/${id}/${avaliable}/${completed}`, 
        //Manda al backend con el fin de actualizarlo 
        //el id del modulo, y los valores de completado y disponible
        {
          method: "PATCH",
          body: JSON.stringify({
            avaliable: avaliable,
            completed: completed,
          }),
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  function Updatear() {//Funcion que updatea de acuerdo al modulo que te encuentres.
    updateStatus(id.toString(), "true", "true");
    if (_id < 3) {
      updateStatus((_id + 1).toString(), "true", "false");
    } else {
      updateStatus(id.toString(), "true", "true");
    }
  }
  function Correcto() { //Funcion en caso de pregunta correcta
    Updatear();
    alert("Correcto");
    window.location.replace(`/`);
  }
  function Incorrecto() { //Funcion en caso de pregunta incorrecta.
    alert("Incorrecto");
    window.location.replace(`http://localhost:3000/modulo/${id}`);
  }

  CrearClases(); //Le pido crear clases, de una vez.

  return (
    <div className="container">
      <Link to={'/'}><FontAwesomeIcon icon='fa-solid fa-arrow-left' title='Regresar' className='return' /></Link>
      <div className="shadow-lg p-3 rounded">
        {preg_esc.map((element) => { 
          if (element.getmodulo() === "Principiante") { //Si el modulo es Principiante
            return (
              <div className="mt-3 text-center">
                <h1 className="fs-1 mb-4 text-uppercase">- Nivel principiante -</h1>
                <h1 className="mb-4 fs-1 pb-4 border-bottom">
                  {element.getQuestion()}
                </h1>
                <h2 className="mb-4 fs-4">
                  Haga click en la respuesta correcta:
                </h2>
                <img
                  className="border border-light"
                  src={element.getAnswer()}
                  onClick={Correcto}
                  alt="Imagen de seña 1"
                ></img>
                <img
                  className="border border-light"
                  src={element.getRespuestaInc()[0]}
                  onClick={Incorrecto}
                  alt="Imagen de seña 2"
                ></img>
                <img
                  className="border border-light"
                  src={element.getRespuestaInc()[1]}
                  onClick={Incorrecto}
                  alt="Imagen de seña 3"
                ></img>
                <img
                  className="border border-light"
                  src={element.getRespuestaInc()[2]}
                  onClick={Incorrecto}
                  alt="Imagen de seña 4"
                ></img>
              </div>
            );
          } else if (element.getmodulo() === "Intermedio") {//Si el modulo es intermedio
            return (
              <table className="mt-3 container text-center">
                <th className="border border-light">
                  <h1 className="fs-1 mb-4 text-uppercase pb-4">- Nivel intermedio -</h1>
                  <Video pregunta={element.getQuestion()} />
                </th>
                <tr>
                  <h1 className="mt-3 mb-4 pb-3 border-bottom">
                    ¿Cuál es el gesto que se ve en el video?
                  </h1>
                </tr>
                <tr>
                  <h2 className="mb-4 fs-4">
                    Haga click en la respuesta correcta:
                  </h2>
                </tr>
                <tr>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Correcto}
                  >
                    {element.getAnswer()}
                  </button>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Incorrecto}
                  >
                    {element.getRespuestaInc()[0]}
                  </button>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Incorrecto}
                  >
                    {element.getRespuestaInc()[1]}
                  </button>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Incorrecto}
                  >
                    {element.getRespuestaInc()[2]}
                  </button>
                </tr>
                <tr>
                  <h1>{ }</h1>
                </tr>
              </table>
            );
          } else if (element.getmodulo() === "Avanzado") { //Si el modulo es avanzado
            return (
              <table className="mt-3 container text-center">
                <th className="border border-light">
                  <h1 className="fs-1 mb-4 text-uppercase pb-4">- Nivel avanzado -</h1>
                  <Video pregunta={element.getQuestion()} />
                </th>
                <tr>
                  <h1 className="mt-3 mb-4 pb-3 border-bottom">
                    ¿Cuál es el gesto que se ve en el video?
                  </h1>
                </tr>
                <tr>
                  <h2 className="mb-4 fs-4">
                    Haga click en la respuesta correcta:
                  </h2>
                </tr>
                <tr>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Correcto}
                  >
                    {element.getAnswer()}
                  </button>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Incorrecto}
                  >
                    {element.getRespuestaInc()[0]}
                  </button>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Incorrecto}
                  >
                    {element.getRespuestaInc()[1]}
                  </button>
                  <button
                    className="btn btn-primary border border-white"
                    onClick={Incorrecto}
                  >
                    {element.getRespuestaInc()[2]}
                  </button>
                </tr>
                <tr>
                  <h1>{ }</h1>
                </tr>
              </table>
            );
          }
        })}
      </div>
    </div>
  );
};

class CuestionarioComponente{

  InitCuestionario(){
    return Cuestionario()
  }
}

let VistaCuestionario = new CuestionarioComponente()
export default VistaCuestionario.InitCuestionario;
