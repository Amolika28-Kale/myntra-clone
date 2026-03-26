# Myntra Clone - Full Stack MERN E-Commerce

A complete, production-ready fashion e-commerce platform built with MongoDB, Express, React, and Node.js.

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run seed    # Populate database with sample products
npm run dev     # Start server on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm start       # Start React app on port 3000
```

## 📋 Requirements Met

✅ **Authentication**
- JWT-based signup/login
- Protected routes for cart, wishlist, checkout
- User profile management

✅ **Homepage**
- FASHIONISTA hero banner
- 8-brand carousel (Nike, Adidas, Zara, H&M, FASHIONISTA, Levi's, Puma, UCB)
- Featured products section
- "View All Inventories" button

✅ **Navigation Bar**
- Search with real-time suggestions
- Men | Women | Kids filters
- Wishlist & Cart badges
- Login/Signup buttons
- User profile menu

✅ **Brand Product Pages**
- Products filtered by brand
- Full product details (image, name, price, colors, sizes)
- Add to Cart & Wishlist
- Side filters (category, price, color, size)

✅ **All Products Page**
- Grid layout of all 40+ products
- Advanced filtering (category, price, color, gender)
- Sorting options (price, newest, popularity)
- Search functionality

✅ **Wishlist**
- Add/remove items
- Move to cart
- Persistent storage

✅ **Shopping Cart**
- Quantity management
- Item removal
- Price summary
- Checkout button

✅ **Checkout**
- Address & delivery information
- Order confirmation
- Order summary

✅ **Backend**
- Express.js REST API
- MongoDB database
- User, Product, Cart, Wishlist, Order models
- 40+ sample products (5+ per brand)
- Seed script included

✅ **UI/UX**
- Myntra-inspired modern design
- Fully responsive (mobile, tablet, desktop)
- Toast notifications
- Loading skeletons
- Smooth animations

## 📦 What's Included

### Backend Files
- 5 MongoDB models (User, Product, Cart, Wishlist, Order)
- 5 controllers (auth, products, cart, wishlist, orders)
- 5 API routes with JWT protection
- Seed script with 40+ products
- CORS configured
- Error handling middleware

### Frontend Files
- 8 reusable components
- 7 pages (Home, Products, Brand, Cart, Wishlist, Checkout, Auth)
- Redux store with 4 slices
- API service with Axios
- 10+ CSS files (responsive)
- Toast notifications
- Protected routes

## 🛠️ Tech Stack

**Backend:**
- Node.js, Express.js, MongoDB, JWT, bcryptjs

**Frontend:**
- React, Redux Toolkit, React Router, Axios
- CSS3 (no external UI library - 100% custom CSS)

## 📚 Key Features

1. **Product Management** - Filter, sort, search across 40+ products
2. **Shopping Cart** - Add/remove items, adjust quantities
3. **Wishlist** - Save favorite items for later
4. **Authentication** - Secure JWT-based auth
5. **Responsive Design** - Works on all devices
6. **User-Friendly** - Toast notifications, loading states, error handling

## 📝 Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myntra-clone
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🗂️ Project Structure

```
myntra-clone/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── scripts/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 💾 Database

MongoDB includes:
- **Users**: Email, password (hashed), profile info
- **Products**: 40+ items across 8 brands, 3 categories, 3 genders
- **Cart**: User-specific shopping carts
- **Wishlist**: User-specific wishlists
- **Orders**: Order history with delivery info

## 🔐 Security

- Password hashing with bcryptjs
- JWT authentication tokens
- Protected API routes
- CORS enabled
- Input validation

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: 480px - 768px
- Small Mobile: Below 480px

## ✨ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Sample Data Included

8 brands with 5+ products each:
- Nike, Adidas, Zara, H&M, FASHIONISTA, Levi's, Puma, UCB

Categories:
- Topwear, Bottomwear, Footwear

Genders:
- Men, Women, Kids

## 🚀 Deployment Ready

- Production-ready code
- Error handling throughout
- Loading states for better UX
- Environment-based configuration
- Seed data automation

## 📖 Full Documentation

See [README.md](./README.md) for comprehensive documentation including:
- Detailed installation instructions
- API documentation
- Feature descriptions
- Troubleshooting guide
- Future enhancements

## 🤝 Contributing

This is a learning project. Feel free to fork and enhance!

## 📄 License

MIT License

---

**Built with ❤️ for Fashion E-Commerce Learning**
