const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Books',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
    min: 0,
  },
});

const shippingAddressSchema = new mongoose.Schema({
  recipientName: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
});

const paymentDetailsSchema = new mongoose.Schema({
  transactionId: { type: String },
  paymentGatewayResponse: { type: mongoose.Schema.Types.Mixed }, // stores JSON response from gateway
  error: { type: String },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: [arr => arr.length > 0, 'Order must have at least one item.'],
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String, 
    required: true,
  },
  paymentDetails: paymentDetailsSchema,
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: {
    type: Date,
  },
  notes: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
