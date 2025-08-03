const Books = require('../models/Books')
const Users = require('../models/User')
const Cart = require('../models/Cart')
const addToCart = async (req, res) => {
       try {
        const userId = req.user
       const {book: bookId, quantity} = req.body 
       if(!bookId){
        res.status(400).json({msg: "Book id is required"})
       }
       const findBook = await Books.findOne({bookId})
       if(!findBook){
        res.status(404).json({msg: "book doesnt exist"})
       }
       const qty = quantity && quantity > 0 ? quantity : 1 
       let cart = await Cart.findOne({user: userId})
       if(!cart) {
        cart = new Cart({
            user: userId,
            items: [{book: bookId, quantity: qty}]
        })
       }else{
        const itemIndex = cart.items.findIndex(
            (item) => item.book.toString === bookId
        )
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += qty 
        }else{
            cart.items.push({book: bookId, quantity: qty})
        }
       }
       await Cart.save()
       const populatedCart = await cart
       .populate('user', 'name email role')
       .populate('items.book', 'title author price image')
       .execPopulate()

       res.status(200).json({
        msg: 'Book added to the cart',
        cart: populatedCart,
       })
       } catch (error) {
        console.error('add to cart error', error)
        res.status(500).json({msg : 'server error adding to cart'})
       }
}

export default addToCart