import React from 'react';
import PayPalDonationButton from './PayPalDonationButton';
import ProductImage from './image/default-image.jpg'
import './donations.css';

function Donations() {
  const product = {
    description: 'Donación a Positive Signs',
    price: 1
  }

  return (
    <div className='checkout'>
      <h1>Donación Mediante PayPal</h1>
      <p className='checkout-title'>
        ¡Cualquier donación es bienvenida!
      </p>
      <p className='checkout-description'>
        Aquí podrás proceder a realizar una pequeña donación que ayude a mantener este proyecto a flote.
      </p>
      <h1 className='checkout-price'>$1 USD</h1>
      <img className='product-image' src={ProductImage} alt='Lenguaje de Señas'></img>
      <div className='separator'></div>
      <div className='paypal'>
        <p className='checkout-title'>Donar</p>
        <div className='paypal-button-container'>
          <PayPalDonationButton product={product} />
        </div>
      </div>
    </div>
  )
}

export default Donations;