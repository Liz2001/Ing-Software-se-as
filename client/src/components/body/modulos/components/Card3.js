import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import image1 from '../../../images/image1.jpg';
import image2 from '../../../images/image2.jpg';
import image3 from '../../../images/image3.jpg';

function Card3({ titulo, cuerpo, disponible, completado, id }) {
  const noMostrar = () => {
    console.log("no disponible");
  };

  return (
    <div className="col-4 mt-3">
      <div className="card h-100">
        <img className="rounded img-fluid" src={ image2 } alt='imagen ref' />
        <div className="card-body">
          <h4 className="card-title ">Nivel {titulo}</h4>
          <p className="card-text text-secondary">{cuerpo}</p>
          {disponible ? (
            <Link
              to={`/modulo/${id}`}
              className="btn btn-primary d-grid col-6 mx-auto"
            >
              Iniciar
            </Link>
          ) : (
            <Button color="gray" text="Bloqueado" onClick={noMostrar} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card3;
