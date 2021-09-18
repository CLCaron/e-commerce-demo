import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price, cartItems, currentUser }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51JTqP7FBtZD9tTiaNIyMnssb2H0r47UiFxPYQDx7IG7621Yhtgvhk4XuyXFlEnaAvZSgOewGOLXuJT89Ym9MD85k00RglCKIcQ';

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(() => {
        alert('Payment successful!');
      })
      .then(() => {
        if (currentUser) {
          axios({
            url: 'users',
            method: 'post',
            data: {
              firestoreId: currentUser.id,
              orderedItems: cartItems,
              price,
              token,
            },
          });
        }
      })
      .catch((error) => {
        console.log('Error: ', JSON.parse(error));
        alert('Sorry, there was an issue placing this order.');
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Demo Store Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
