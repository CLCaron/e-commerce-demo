const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

module.exports = router;

// Create user if does not exist. Update user's orders if they do exist. This will happen for every order placed. This is the way until finished migrating from firebase to MongoDB completely
router.post('/', async (req, res) => {
  const token = req.body.token;
  const currentDate = Date.now();
  const today = new Date(currentDate);

  const address = {
    street: token.card.address_line1,
    city: token.card.address_city,
    state: token.card.address_state,
    zip: token.card.address_zip,
  };

  const order = {
    orderId: uuidv4(),
    orderDate: today.toDateString(),
    orderedItems: req.body.orderedItems,
    total: req.body.price,
    address: address,
    customerName: token.card.name,
    customerEmail: token.email,
  };

  try {
    const user = await User.findOneAndUpdate(
      {
        firestoreId: req.body.firestoreId,
      },
      {
        $set: { name: token.card.name, email: token.email, address: address },
        $push: { orders: order },
      },
      { upsert: true }
    );
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retreive one user's orders
router.get('/:firestoreId/orders', getUser, (req, res) => {
  try {
    res.json(res.user.orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* This code works but has issues with react components rendering. I need to go through with using the sagas etc..
FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, etc.. the basic get request above works for now. */
// router.get('/:firestoreId/orders', getUser, async (req, res) => {
//   try {
//     const orders = await User.find(
//       { firestoreId: req.params.firestoreId },
//       { orders: 1, _id: 0 }
//     );
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findOne({ firestoreId: req.params.firestoreId });
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}
