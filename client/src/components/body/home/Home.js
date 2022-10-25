import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";
import signLanguage from "../../images/signLanguage.png";

function Home() {
  return (
    <div className="home_page">
      <div className="container">
        <div className="row mt-4">
          <div className="col-6">
            <div>
              <h2 className="fw-bold fs-1">
                DEMUESTRA TUS CONOCIMIENTOS EN LEGUAJE DE SEÑAS
              </h2>
            </div>
            <div className="mt-4">
              <h4 style={{ textAlign: "justify" }}>
                Bienvenido a Positive Signs, una app web en la cual podrá poner
                a prueba tus habilidades en el lenguaje de señas peruano. Debes
                iniciar sesión o registrarte para realizar el quiz.
              </h4>
              <table className="mt-4">
                <th>Grupo 6:</th>
                <tr>-Sebastian Guevara</tr>
                <tr>-Angel Cuya</tr>
                <tr>-Estefani Ramos</tr>
                <tr>-Kevin Garcia</tr>
                <tr>-Sebastian Bañon</tr>
                <tr>-Francisco Diaz</tr>
              </table>
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
          <div className="col-6">
            <img
              className="img-fluid rounded float-end mb-2"
              src={signLanguage}
              alt="imagenSL"
            ></img>
            <p style={{ textAlign: "right" }}>
              Pantallazo de prueba Si puedes ver esto, significa que todo
              funciona bien :) Luego le pongo una interfaz más chvr.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
