
const mongoose = require('mongoose');

const Roles = ['user', 'admin'];

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: [50, "Name can't be more than 50 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Basic regex for email validation (simplified)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(v);
      },
      message: props => `Email is not valid: ${props.value}`
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Roles,
    default: 'user',
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Users", UserSchema);
