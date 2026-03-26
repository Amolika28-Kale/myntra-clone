const express = require('express');
const {
  getAllProducts,
  getProduct,
  getProductsByBrand,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/single/:id', getProduct);
router.get('/brand/:brandName', getProductsByBrand);

module.exports = router;
