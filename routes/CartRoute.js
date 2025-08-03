const express = require('express')
const authMiddleware = require('../middleware/authmiddleware')
const addToCart = require('../controllers/CartControllers')
const CartRouter = express.Router()
CartRouter.post('/addItemToCart', authMiddleware, addToCart)
module.exports = CartRouter