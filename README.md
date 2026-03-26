# Myntra Clone - Full Stack MERN E-Commerce Web App

A complete fashion e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). This application features a modern UI similar to Myntra with comprehensive product browsing, shopping cart, and wishlist functionality.

## Features

### Authentication
- User Registration and Login with JWT authentication
- Protected routes for secure operations
- Persistent authentication with localStorage

### Homepage
- Hero banner featuring "FASHIONISTA" brand
- Horizontal scrollable brand carousel with 8 brands (Nike, Adidas, Zara, H&M, FASHIONISTA, Levi's, Puma, UCB)
- Brand-based navigation to product listings
- "View All Inventories" section to explore all products
- Featured products display

### Navigation Bar
- Logo and branding
- Real-time search functionality
- Gender-based filtering (Men | Women | Kids)
- Wishlist and Cart icons with item count badges
- User profile menu with logout option
- Login/Signup buttons for unauthenticated users
- Fully responsive design

### Product Pages
**Brand Products Page:**
- Display all products from a specific brand
- Product cards with: image, name, brand, price, MRP, colors, stock status
- Add to Cart and Wishlist buttons
- Product image carousel

**All Products/Inventory Page:**
- Grid layout of all products from all brands
- Advanced filtering options:
  - Category (Topwear, Bottomwear, Footwear)
  - Price range slider
  - Color selection
  - Gender (Men, Women, Kids)
- Sorting options:
  - Price (Low to High, High to Low)
  - Newest First
  - Popularity
- Search functionality
- Responsive grid layout

### Product Cards
- High-quality product images
- Brand name and product name
- Original and discounted prices with discount percentage
- Star ratings and review counts
- Color swatches for selection
- Size selector dropdown
- Add to Cart button
- Wishlist (heart) button with toggle state
- Visual feedback on hover

### Wishlist
- View all wishlisted items
- Move items to cart
- Remove items from wishlist
- Empty state with call-to-action

### Shopping Cart
- Display all cart items with quantity controls
- Item details: image, name, color, size, price
- Adjust quantity (increase/decrease)
- Remove individual items
- Price breakdown (MRP, discount, total)
- Proceed to checkout button
- Empty cart state with navigation

### Checkout
- Delivery address form
- City, state, and zip code input
- Phone number field
- Order summary with itemized breakdown
- Total price calculation
- Place order button

### State Management
- Redux Toolkit for global state management
- Separate slices for: Auth, Products, Cart, Wishlist
- Async actions with loading and error states

### UI/UX Features
- Clean and modern Myntra-inspired design
- Toast notifications for user actions
- Loading skeletons for product cards
- Fully responsive mobile-first design
- Smooth animations and transitions
- Professional color scheme

## Project Structure

```
myntra-clone/
├── backend/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   └── Order.js
│   ├── controllers/         # Route handlers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   └── orderController.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── scripts/             # Seed data script
│   │   └── seedProducts.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/       # Reusable components
    │   │   ├── Navbar.js
    │   │   ├── ProductCard.js
    │   │   ├── BrandCarousel.js
    │   │   ├── HeroBanner.js
    │   │   ├── FilterSidebar.js
    │   │   ├── ProtectedRoute.js
    │   │   ├── Toast.js
    │   │   └── LoadingSkeleton.js
    │   ├── pages/           # Page components
    │   │   ├── Home.js
    │   │   ├── Products.js
    │   │   ├── BrandProducts.js
    │   │   ├── Cart.js
    │   │   ├── Wishlist.js
    │   │   ├── Checkout.js
    │   │   ├── Login.js
    │   │   └── Signup.js
    │   ├── store/           # Redux store and slices
    │   │   ├── index.js
    │   │   ├── authSlice.js
    │   │   ├── productSlice.js
    │   │   ├── cartSlice.js
    │   │   └── wishlistSlice.js
    │   ├── services/        # API service
    │   │   └── api.js
    │   ├── styles/          # CSS files
    │   │   ├── index.css
    │   │   ├── navbar.css
    │   │   ├── productcard.css
    │   │   ├── hero.css
    │   │   ├── carousel.css
    │   │   ├── filters.css
    │   │   ├── home.css
    │   │   ├── products.css
    │   │   ├── auth.css
    │   │   ├── cart.css
    │   │   ├── wishlist.css
    │   │   ├── checkout.css
    │   │   └── loading.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file with the following variables:**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/myntra-clone
   JWT_SECRET=your_secure_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Seed the database with sample products:**
   ```bash
   npm run seed
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

Frontend will open at `http://localhost:3000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Product Endpoints
- `GET /api/products` - Get all products with filters
- `GET /api/products/single/:id` - Get single product
- `GET /api/products/brand/:brandName` - Get products by brand

### Cart Endpoints
- `POST /api/cart` - Add item to cart (Protected)
- `GET /api/cart` - Get cart items (Protected)
- `PUT /api/cart/:productId` - Update cart item quantity (Protected)
- `DELETE /api/cart/:productId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Wishlist Endpoints
- `POST /api/wishlist` - Add to wishlist (Protected)
- `GET /api/wishlist` - Get wishlist (Protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (Protected)

### Order Endpoints
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:orderId` - Get single order (Protected)

## Sample Data

The database includes 40+ products from 8 brands:
- **Nike** - Sports footwear and apparel
- **Adidas** - Shoes and athletic wear
- **Zara** - Fashion clothing and accessories
- **H&M** - Casual and everyday wear
- **FASHIONISTA** - Premium denim and fashion
- **Levi's** - Classic denim and jeans
- **Puma** - Sportswear and accessories
- **UCB** - Casual and comfortable clothing

Each product includes:
- Name and description
- Brand and category
- Original MRP and discounted price
- Available colors and sizes
- Product images (from Unsplash)
- Stock availability
- Ratings and reviews

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **CSS3** - Styling (custom, no external UI library)

## Key Features Implementation

### Authentication Flow
1. User registers/logs in with email and password
2. Backend validates credentials and issues JWT token
3. Token stored in localStorage for persistence
4. All protected routes checked for valid JWT
5. Automatic logout on invalid/expired token

### Cart Management
- Add items with selected color and size
- Update quantity in real-time
- Automatic price calculation
- Persist cart data (user-specific)
- Clear cart on checkout

### Wishlist Features
- Toggle items in/out of wishlist
- Move items directly to cart
- Separate wishlist for each user
- Persistent across sessions

### Product Filtering
- Multi-category filtering
- Price range filtering
- Color-based filtering
- Gender-based filtering
- Real-time search
- Sorting by price, newest, popularity

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly UI elements
- Optimized for all screen sizes

## Future Enhancements

- Payment gateway integration (Stripe/Razorpay)
- User profile and order history
- Product reviews and ratings
- Admin panel for product management
- Email notifications
- Order tracking
- Wishlist sharing
- Product comparison
- Size/fit guide
- Inventory management
- Analytics dashboard

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in .env
- For MongoDB Atlas, ensure IP whitelist includes your machine

### Port Already in Use
- Backend: Change PORT in .env file
- Frontend: Use `PORT=3001 npm start` to use different port

### CORS Issues
- Ensure `cors` is properly configured in server.js
- Frontend proxy in package.json is set correctly
- Check API base URL in services/api.js

### Redux DevTools
- Install Redux DevTools browser extension for debugging
- Time-travel debugging available in development

## Deployment

### Backend (Vercel/Railway)
1. Create account on hosting platform
2. Deploy with: `npm install && npm start`
3. Set environment variables in platform dashboard
4. Configure MongoDB Atlas for cloud database

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `build/` folder
3. Ensure API_URL points to live backend

## License

MIT License - Feel free to use this project for learning and development purposes.

## Support

For issues and questions, please open an issue on the repository or contact the development team.

---

**Happy Shopping! 🛍️**
