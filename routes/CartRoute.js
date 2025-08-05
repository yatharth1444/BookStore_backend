const express = require('express')
const authMiddleware = require('../middleware/authmiddleware')
const {addToCart, RemoveFromCartItem, RemoveALLTheBooksAtOnce} = require('../controllers/CartControllers')
const CartRouter = express.Router()
CartRouter.post('/addItemToCart', authMiddleware, addToCart)
CartRouter.post('/removeItem', authMiddleware, RemoveFromCartItem )
CartRouter.post('/removeAtOnce',authMiddleware, RemoveALLTheBooksAtOnce)
module.exports = CartRouter