import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gracias from "../image/gracias.png";

function About() {
  return (
    <div className="container">
      <div className="shadow-lg p-3 rounded mt-5">
        <img
          className="img-fluid rounded mx-auto d-block mb-5"
          src={gracias}
          alt="gracias"
        ></img>
        <div className="text-center">
          <h1 className="fw-bold fs-1 border-bottom pb-4" style={{ color: "teal" }}>
            PAGO CONFIRMADO
          </h1>
          <h2 className="mt-4">¡Ha realizado un pago de $1.00 USD de manera exitosa!</h2>
          <p className="fs-5 text-center" style={{ textAlign: "justify" }}>
            Muchas gracias por darte tu tiempo y decidir apoyarnos en este
            proyecto.
          </p>
          <button className="btn btn-success btn-lg mt-3 mb-3">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <FontAwesomeIcon icon="fa-solid fa-check" /> Aceptar
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
