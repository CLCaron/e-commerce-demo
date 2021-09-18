import React from 'react';
import {
  OrderContainer,
  OrderProductsContainer,
  CustomerDetailsContainer,
  CustomerDetailsHeader,
  ProductContainer,
  ProductDetailsHeader,
} from './order.styles';

const Order = ({ order }) => {
  return (
    <OrderContainer>
      <OrderProductsContainer>
        <ProductDetailsHeader>
          ORDER: {order.orderId} | {order.orderDate}
        </ProductDetailsHeader>
        {order.orderedItems.map((orderedItem) => {
          return (
            <ProductContainer>
              <div>
                <img
                  src={orderedItem.imageUrl}
                  alt={orderedItem.name + ' image'}
                />
              </div>
              <div className='details-div'>
                {orderedItem.name}
                <br />${orderedItem.price}
                <br />
                Qty: {orderedItem.quantity}
              </div>
            </ProductContainer>
          );
        })}
      </OrderProductsContainer>
      <CustomerDetailsContainer>
        <CustomerDetailsHeader>Customer Details</CustomerDetailsHeader>
        {order.customerName}
        <br />
        {order.customerEmail}
        <br />
        {order.address.street}
        <br />
        {order.address.city}, {order.address.state}, {order.address.zip}
        <br />
        <div className='total'>TOTAL: ${order.total}</div>
      </CustomerDetailsContainer>
    </OrderContainer>
  );
};

export default Order;
