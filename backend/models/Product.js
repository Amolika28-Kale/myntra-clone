const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please provide brand name'],
    },
    category: {
      type: String,
      enum: ['Topwear', 'Bottomwear', 'Footwear'],
      required: [true, 'Please provide category'],
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Kids'],
      required: [true, 'Please provide gender'],
    },
    mrp: {
      type: Number,
      required: [true, 'Please provide MRP'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide discounted price'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: String,
    colors: [String],
    sizes: [String],
    images: [String],
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
