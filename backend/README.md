# Zoss Water Backend API

A comprehensive backend API for the Zoss Water customer management system, built with Express.js and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with local and OAuth support
- **Product Management**: CRUD operations for water ionizer products
- **Service Scheduling**: Automated service tracking and notifications
- **Admin Panel**: Administrative controls for user and product management
- **Role-based Access**: User and admin role separation
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Centralized error handling with detailed logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Multer (for product images)

## Project Structure

```
backend/
├── src/
│   ├── controllers/       # Business logic
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── serviceController.js
│   │   └── adminController.js
│   ├── routes/            # API endpoints
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── adminRoutes.js
│   ├── models/            # Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Service.js
│   │   └── AdminUpdate.js
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/             # Helper functions
│   │   ├── validation.js
│   │   └── dateUtils.js
│   ├── config/            # Configuration files
│   │   ├── db.js
│   │   └── env.js
│   └── index.js           # Main application entry
├── .env                   # Environment variables
├── package.json
└── README.md
```

## Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy `.env.example` to `.env` and configure:
   ```env
   MONGO_URI=mongodb://localhost:27017/zoss_water_db
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8080
   ADMIN_EMAIL=admin@zosswater.com
   ```

4. **Start the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

### Products
- `GET /api/products/my-products` - Get user's products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Services
- `GET /api/services/my-services` - Get user's services
- `GET /api/services/due-soon` - Get services due soon
- `PUT /api/services/:id/complete` - Mark service complete
- `GET /api/services/overdue` - Get overdue services (Admin)

### Admin
- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/pending-approvals` - Pending product approvals
- `PUT /api/admin/approve-product/:id` - Approve product
- `GET /api/admin/product-templates` - Product templates
- `POST /api/admin/product-templates` - Create product template

## Database Schema

### Users Collection
```javascript
{
  userId: String (unique),
  name: String,
  email: String (unique),
  password: String (hashed),
  provider: String ('local' | 'google'),
  role: String ('user' | 'admin'),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  userId: String,
  productName: String,
  modelNumber: String,
  purchaseDate: Date,
  imageUrl: String,
  warranty: {
    start: Date,
    end: Date
  },
  amcValidity: {
    start: Date,
    end: Date
  },
  isApprovedByAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Services Collection
```javascript
{
  userId: String,
  productId: ObjectId (ref: Product),
  nextServiceDate: Date,
  lastServiceDate: Date,
  status: String ('Upcoming' | 'Due Soon' | 'Overdue' | 'Completed'),
  notificationSent: Boolean,
  serviceNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configured for frontend domain
- **Input Validation**: Comprehensive validation using express-validator
- **Helmet**: Security headers for Express apps
- **Role-based Access**: Admin and user role separation

## Error Handling

The API uses a centralized error handling system that:
- Catches and formats all errors consistently
- Provides detailed error messages in development
- Logs errors for debugging
- Returns appropriate HTTP status codes

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses nodemon for automatic server restart on file changes.

### Environment Variables
Make sure to set up all required environment variables in `.env`:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend application URL for CORS

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGO_URI` in `.env`
3. The application will automatically connect on startup

## Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a strong `JWT_SECRET`
3. Configure MongoDB connection for production
4. Set up proper CORS origins
5. Use a process manager like PM2 for production deployment

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation for new endpoints
4. Update this README for new features
5. Test all endpoints before submitting

## License

This project is proprietary to Zoss Water Pvt. Ltd.