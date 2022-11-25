import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalDonationButton = (props) => {
  const { product } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    setPaidFor(true);
  }

  if (paidFor) {
    alert('Gracias por su donación :)');
  }

  if (error) {
    alert(error);
  }

  return (
    <PayPalScriptProvider options={{ 'client-id': 'AbMHrzKc-xW1ecRa3hezV-lKCho9-IkJ6WrvJWBtMFdgZ9uz8qYGX4IdwwQ4DfTcFq5qlOVmolf-YzuX' }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log('order', order);
          handleApprove(data.orderID);
        }}
        onCancel={() => { }}
        onError={(error) => {
          setError(error);
          console.log('Error durante la donación', error);
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalDonationButton;