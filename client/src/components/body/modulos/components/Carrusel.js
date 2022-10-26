import React from "react";
import Button from './Button';
import { Link } from 'react-router-dom';
import img2 from "../../../images/img2.jpg";

function Carrusel({ titulo, cuerpo, disponible, completado, id }) {
    const noMostrar = () => {
        console.log('no disponible')
    }

    return <div className="container">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img2} className="d-block w-100" alt="Modulo" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className="fs-1 fw-bold text-uppercase pb-2 border-bottom">Nivel {titulo}</h5>
                        <p className="fs-4" style={{ textAlign:'justify', background:'white', color:'black', padding:'15px' }}>{cuerpo}</p>
                        {disponible ? <Link to={`/modulo/${id}`} className="btn btn-primary">Empezar módulo</Link>
                            : <Button color='gray' text='Módulo bloqueado' onClick={noMostrar} />
                        }
                    </div>
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
}

export default Carrusel;