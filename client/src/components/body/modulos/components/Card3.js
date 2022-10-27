import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import image2 from '../../../images/image2.jpg';

function Card3({ titulo, cuerpo, disponible, completado, id }) {
  const noMostrar = () => {
    console.log("no disponible");
  };

  return (
    <div className="col-4 mt-3">
      <div className="card h-100 rounded-0">
        <img className="img-fluid" src={ image2 } alt='imagen ref' />
        <div className="card-body">
          <h4 className="card-title fw-bold fs-3 text-center text-uppercase pb-2 border-bottom">Nivel {titulo}</h4>
          <p style={{ textAlign: 'justify' }} className="card-text text-secondary">{cuerpo}</p>
          
        </div>
      </div>
      {disponible ? (
            <Link
              to={`/modulo/${id}`}
              className="rounded-0 btn btn-primary d-grid mx-auto"
            >
              Iniciar
            </Link>
          ) : (
            <Button color="gray" text="Bloqueado" onClick={noMostrar} />
          )}
    </div>
  );
}

export default Card3;
