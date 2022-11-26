import React from "react";
import PayPalDonationButton from "./PayPalDonationButton";
import ProductImage from "./image/default-image.jpg";

function Donations() {
  const product = {
    description: "Donación a Positive Signs",
    price: 1,
  };

  return (
    <div className="home_page">
      <div className="container">
        <div className="mt-5">
          <h1 className="fw-bold fs-1" style={{ color: "teal" }}>
            DONACIONES
          </h1>
          <h3>¡Cualquier donación es bienvenida!</h3>
          <p className="mt-3 fs-5" style={{ textAlign: "justify" }}>
            Aquí podrás proceder a realizar una pequeña donación de 1 dólar, que
            puede ayudar a mantener este proyecto a flote. Puedes usar PayPal, o
            ingresar manualmente tu tarjeta de crédito o débito (VISA).
          </p>
          <img
            className="img-fluid rounded mx-auto d-block mb-5 mt-5"
            src={ProductImage}
            alt="Lenguaje de Señas"
          ></img>
          <div className="container col-6">
            <p className="mt-3 fs-5" style={{ textAlign: "justify" }}>
              Donar:
            </p>
            <h1 className="fw-bold fs-1" style={{ color: "green" }}>
              $1 USD
            </h1>
            <div className="paypal-button-container">
              <PayPalDonationButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donations;
