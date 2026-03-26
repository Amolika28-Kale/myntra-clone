const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Add item to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, selectedColor, selectedSize } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: quantity || 1,
            selectedColor,
            selectedSize,
            price: product.price,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        item =>
          item.product.toString() === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity || 1,
          selectedColor,
          selectedSize,
          price: product.price,
        });
      }
      await cart.save();
    }

    // Calculate total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const prod = await Product.findById(item.product);
      totalPrice += prod.price * item.quantity;
    }
    cart.totalPrice = totalPrice;
    await cart.save();

    cart = await cart.populate('items.product');
    res.status(200).json({ success: true, message: 'Added to cart', data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ success: true, data: { items: [], totalPrice: 0 } });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;

    if (cartItem.quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
    }

    // Recalculate total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const prod = await Product.findById(item.product);
      totalPrice += prod.price * item.quantity;
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    const updatedCart = await cart.populate('items.product');

    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    // Recalculate total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const prod = await Product.findById(item.product);
      totalPrice += prod.price * item.quantity;
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    const updatedCart = await cart.populate('items.product');

    res.status(200).json({ success: true, message: 'Removed from cart', data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.deleteOne({ user: userId });

    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
