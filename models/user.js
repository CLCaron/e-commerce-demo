const mongoose = require('mongoose');

const address = {
  street: String,
  city: String,
  state: String,
  zip: String,
};

const userSchema = new mongoose.Schema({
  firestoreId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: address,
    required: true,
  },
  orders: {
    type: [],
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema);
