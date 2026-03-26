const Product = require('../models/Product');

// @desc    Get all products with filters
// @route   GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const { brand, gender, category, minPrice, maxPrice, color, sortBy, search } = req.query;

    let query = {};

    if (brand) query.brand = brand;
    if (gender) query.gender = gender;
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (color) query.colors = color;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    if (sortBy === 'price_low') sortOption.price = 1;
    else if (sortBy === 'price_high') sortOption.price = -1;
    else if (sortBy === 'newest') sortOption.createdAt = -1;
    else if (sortBy === 'popularity') sortOption.rating = -1;

    const products = await Product.find(query).sort(sortOption);

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get products by brand
// @route   GET /api/products/brand/:brandName
exports.getProductsByBrand = async (req, res) => {
  try {
    const products = await Product.find({ brand: req.params.brandName });

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found for this brand' });
    }

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
