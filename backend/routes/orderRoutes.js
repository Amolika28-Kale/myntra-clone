const express = require('express');
const { createOrder, getUserOrders, getOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:orderId', protect, getOrder);

module.exports = router;
