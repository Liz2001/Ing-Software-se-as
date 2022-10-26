import React from "react";
import Card from "./components/Card";
import { useState } from "react";
import { useEffect } from "react";
//import Button from "./components/Button";
//import { Link } from 'react-router-dom';
//import Carrusel from "./components/Carrusel"
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
  /*
  const noMostrar = () => {
    console.log('no disponible')
  };
  */

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
    <div className="container">
      <div className="row">
        <div className="mt-5">
          <h1 >SELECCIONA EL MÓDULO</h1>
          <p className="border-bottom pb-4 mt-3">Podrás avanzar al siguiente una vez hayas acabado el anterior.</p>
        </div>
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
        
        {/* 
        
        Aquí probé implementar un carrusel para la vista de modulos, pero aun hay complicaciones -fd

        <div className="container">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
            <div className="carousel-inner">
              <div className="carousel-item active">
                {Objetos[0].map((obj1) => {
                  return (
                    <>
                      <img src={img1} className="d-block w-100" alt="Modulo" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="fs-1 fw-bold text-uppercase pb-2 border-bottom">Nivel {obj1.getTitulo()}</h5>
                        <p className="fs-4" style={{ textAlign: 'justify', background: 'white', color: 'black', padding: '15px' }}>{obj1.getTexto()}</p>
                        {obj1.getDisponible() ? <Link to={`/modulo/${obj1.getId()}`} className="btn btn-primary">Empezar módulo</Link>
                          : <Button color='gray' text='Módulo bloqueado' onClick={noMostrar} />
                        }
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="carousel-item">
                {Objetos[1].map((obj2) => {
                  return (
                    <>
                      <img src={img2} className="d-block w-100" alt="Modulo" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="fs-1 fw-bold text-uppercase pb-2 border-bottom">Nivel {obj2.getTitulo()}</h5>
                        <p className="fs-4" style={{ textAlign: 'justify', background: 'white', color: 'black', padding: '15px' }}>{obj2.getTexto()}</p>
                        {obj2.getDisponible() ? <Link to={`/modulo/${obj2.getId()}`} className="btn btn-primary">Empezar módulo</Link>
                          : <Button color='gray' text='Módulo bloqueado' onClick={noMostrar} />
                        }
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="carousel-item">
                {Objetos[2].map((obj3) => {
                  return (
                    <>
                      <img src={img3} className="d-block w-100" alt="Modulo" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="fs-1 fw-bold text-uppercase pb-2 border-bottom">Nivel {obj3.getTitulo()}</h5>
                        <p className="fs-4" style={{ textAlign: 'justify', background: 'white', color: 'black', padding: '15px' }}>{obj3.getTexto()}</p>
                        {obj3.getDisponible() ? <Link to={`/modulo/${obj3.getId()}`} className="btn btn-primary">Empezar módulo</Link>
                          : <Button color='gray' text='Módulo bloqueado' onClick={noMostrar} />
                        }
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Atrás</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
        */}

        {/* A continuación, se encuentra el script para mostrar el progreso en porcentaje */}
        <div className="mt-5">
          <h1 className="fw-bold fs-3 text-center">
            {"PROGRESO ACTUAL: " +
              Math.round((contadorprogreso / Objetos.length) * 100) +
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


export default Modulo;
