import React from "react";
import Members from "./Members";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function About() {
  return (
    <div className="container">
      <div className="mt-5">
        <h1 className="mb-4">Sobre Nosotros</h1>
        <h3>Somos el Grupo 6, creadores de Positive Signs.</h3>
        <div>
          <Members />
        </div>
        <div className="container">
          <div className="col-md-6">
            <h3 className="mt-5">
              Hemos creado esta app con una política sin ánimos de lucro, pero
              si deseas apoyar a que podamos segir mejorando Positive Signs,
              puedes hacer click en el botón a continuación.
            </h3>
          </div>
          <div className="col-md-6">
            <button className="btn btn-dark btn-lg">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />{" "}
                Dónanos
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
