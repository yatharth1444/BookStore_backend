const Cart = require('../models/Cart');
const Books = require('../models/Books');

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("authnticated user info ", req.user)
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
      .populate([
        { path: 'user', select: 'name email role'},
        { path: 'items.book', select: 'title author price image description'} 
      ])
      

    res.status(200).json({
      msg: 'Book added to cart successfully',
      cart: populatedCart,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ msg: 'Server error adding to cart' });
  }
};


const RemoveFromCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { book: bookId, quantity } = req.body;

    if (!bookId) {
      return res.status(400).json({ msg: 'Book id is required' });
    }

    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: "Book does not exist" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: "User cart not found" });
    }

    const qty = quantity && quantity > 0 ? quantity : 1;

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    if (cart.items[itemIndex].quantity > qty) {
      cart.items[itemIndex].quantity -= qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    const populatedCart = await cart.populate([
      { path: 'user', select: 'name email role' },
      { path: 'items.book', select: 'title author description image price' }
    ]);

    return res.status(200).json({
      msg: "Item quantity updated/removed from cart successfully",
      cart: populatedCart,
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    return res.status(500).json({ msg: "Server error removing from cart" });
  }
};

const RemoveALLTheBooksAtOnce = async (req, res) => {
  try {
    const userId = req.user.id;
    const { book: bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ msg: 'Book id is required' });
    }

    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: "Book does not exist" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: "User cart not found" });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.book.toString() !== bookId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    await cart.save();

    const populatedCart = await cart.populate([
      { path: 'user', select: 'name email role' },
      { path: 'items.book', select: 'title author description image price' }
    ]);

    return res.status(200).json({
      msg: "Item removed from cart successfully",
      cart: populatedCart,
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    return res.status(500).json({ msg: "Server error removing from cart" });
  }
};



module.exports = {addToCart, RemoveFromCartItem, RemoveALLTheBooksAtOnce}
