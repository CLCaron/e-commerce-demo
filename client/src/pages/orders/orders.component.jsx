import React, { useState, useEffect } from 'react';
import Order from '../../components/order/order.component';
import { OrdersPageContainer } from './orders.styles';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

const OrdersPage = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (currentUser !== null) {
      axios(`/users/${currentUser.id}/orders`).then((res) => {
        setOrders(res.data);
      });
    }
  }, [currentUser]);
  return (
    <OrdersPageContainer>
      {orders.map((order) => {
        return (
          <Order
            order={order}
            productImageUrl='https://i.ibb.co/XzcwL5s/black-shearling.png'
          />
        );
      })}
    </OrdersPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(OrdersPage);
