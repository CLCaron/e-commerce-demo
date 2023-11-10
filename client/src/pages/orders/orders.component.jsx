import React, { useState, useEffect } from 'react';
import Order from '../../components/order/order.component';
import { OrdersPageContainer } from './orders.styles';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import axios from 'axios';

const OrdersPage = () => {
  const currentUser = useSelector((state) =>
    selectCurrentUser(state)
  );

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

export default OrdersPage;
