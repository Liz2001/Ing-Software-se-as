import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";
import signLanguage from "../../images/signLanguage.png";
import Members from "../about/Members";

function Home() {
  return (
    <div className="home_page">
      <div className="container">
        <div className="row mt-4">
          <div className="col-6">
            <div>
              <h1 className="fw-bold fs-1" style={{ color: "teal" }}>
                DEMUESTRA TUS CONOCIMIENTOS EN LEGUAJE DE SEÑAS
              </h1>
            </div>
            <div className="mt-4">
              <p className="fs-5" style={{ textAlign: "justify" }}>
                Bienvenidos a Positive Signs, una app web en la cual podrán
                poner a prueba tus habilidades en el lenguaje de señas peruano.
                Debes iniciar sesión o registrarte para realizar el quiz.
              </p>
            </div>
            <div className="mt-4">
              <div className="row">
                <div className="col-6 d-grid">
                  <button className="btn btn-dark btn-lg">
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-user" /> Iniciar Sesión
                    </Link>
                  </button>
                </div>
                <div className="col-6 d-grid">
                  <button className="btn btn-outline-dark btn-lg">
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-clipboard" />{" "}
                      Regístrate
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 mb-4">
            <img
              className="img-fluid rounded float-end mb-2"
              src={signLanguage}
              alt="imagenSL"
            ></img>
            <div
              className="fst-italic form-text"
              style={{ textAlign: "right" }}
            >
              Pantallazo de prueba Si puedes ver esto, significa que todo
              funciona bien :) Luego le pongo una interfaz más chvr.
            </div>
          </div>
        </div>
      </div>
      <Members />
    </div>
  );
}

export default Home;
