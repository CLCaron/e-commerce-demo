import React from 'react';
import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-checkout-button/stripe-checkout-button.component';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
} from './checkout.styles';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => selectCartItems(state));
  const total = useSelector((state) => selectCartTotal(state));
  const currentUser = useSelector((state) => selectCurrentUser(state));

  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalContainer>
        <span>TOTAL: ${total}</span>
      </TotalContainer>
      <WarningContainer>
        ***Please use the following test credit card for payments***
        <br />
        4242 4242 4242 4242 - Exp: Any future date - CVC: Any 3 digits
        <br />
        <a href='https://stripe.com/docs/testing#cards'>
          Click here for more info
        </a>
        <br />
        ***This Stripe checkout is in the process of being upgraded from the
        legacy version.***
        <br />
        ***Stripe's legacy checkout does not pass a shipping address in its token
        meaning it cannot be retrieved from the payment. For now, "orders" will be
        saved using the user's billing address.***
      </WarningContainer>
      <StripeCheckoutButton
        price={total}
        cartItems={cartItems}
        currentUser={currentUser}
      />
    </CheckoutPageContainer>
  );
} 


export default CheckoutPage;
