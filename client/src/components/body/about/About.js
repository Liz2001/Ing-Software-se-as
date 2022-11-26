import React from "react";
import Members from "./Members";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function About() {
  return (
    <div className="home_page">
      <div className="container">
        <div className="mt-5">
          <h1 className="fw-bold fs-1" style={{ color: "teal" }}>
            SOBRE NOSOTROS
          </h1>
          <h3>Somos el Grupo 6, creadores de Positive Signs.</h3>
          <div>
            <Members />
          </div>
          <div className="container">
            <div>
              <p className="mt-5 fs-5" style={{ textAlign: "justify" }}>
                Hemos creado esta app con una política sin ánimos de lucro, pero
                si deseas apoyar a que podamos seguir mejorando Positive Signs,
                puedes hacer click en el botón a continuación.
              </p>
            </div>
            <div className="d-grid gap-2 col-2 mx-auto mt-4">
              <button className="btn btn-success btn-lg">
                <Link
                  to="/donations"
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
    </div>
  );
}

export default About;
