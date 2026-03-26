const express = require('express');
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, addToWishlist);
router.get('/', protect, getWishlist);
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
