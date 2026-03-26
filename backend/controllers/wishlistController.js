const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Add product to wishlist
// @route   POST /api/wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [{ product: productId }],
      });
    } else {
      const productExists = wishlist.products.find(p => p.product.toString() === productId);
      if (!productExists) {
        wishlist.products.push({ product: productId });
        await wishlist.save();
      }
    }

    res.status(200).json({ success: true, message: 'Added to wishlist', data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get wishlist
// @route   GET /api/wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId }).populate('products.product');

    if (!wishlist) {
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: wishlist.products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:productId
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(p => p.product.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ success: true, message: 'Removed from wishlist', data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
