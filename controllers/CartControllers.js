const Cart = require('../models/Cart');
const Books = require('../models/Books');

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { book: bookId, quantity } = req.body;

    if (!bookId) {
      return res.status(400).json({ msg: 'Book ID is required' });
    }

    const bookExists = await Books.findById(bookId);
    if (!bookExists) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    const qty = quantity && quantity > 0 ? quantity : 1;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ book: bookId, quantity: qty }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += qty;
      } else {
        cart.items.push({ book: bookId, quantity: qty });
      }
    }

    await cart.save();

    const populatedCart = await cart
      .populate('user', 'name email role')
      .populate('items.book', 'title author price image description')
      .execPopulate();

    res.status(200).json({
      msg: 'Book added to cart successfully',
      cart: populatedCart,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ msg: 'Server error adding to cart' });
  }
};

module.exports = addToCart
