const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create order from cart
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, city, state, zipCode, phone } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const order = await Order.create({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      totalAmount: cart.totalPrice,
      address,
      city,
      state,
      zipCode,
      phone,
    });

    // Clear cart
    await Cart.deleteOne({ user: userId });

    res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).populate('items.product');

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:orderId
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
